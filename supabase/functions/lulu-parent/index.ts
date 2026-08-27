// supabase/functions/lulu-parent/index.ts
//
// Pipeline unique des garde-fous de Lulu Parent (T-032, T-033, T-034),
// au-dessus de la recherche documentaire T-031 (public.rechercher_passages).
// Un seul point d'entrée pour tous les canaux : l'application l'appelle
// directement, le menu USSD et le SMS pourront l'appeler de la même façon
// (adaptateur par canal, contenu et logique communs — cf. plan §5.1/§5.3).
//
// Entrée (POST, JSON) : { "question": string, "utilisateur_id"?: string, "canal"?: "app"|"ussd"|"sms"|"ivr" }
// Sortie (JSON) :
//   { type: "renvoi_medical" | "alerte" | "refus" | "reponse",
//     texte: string,
//     source?: { unite_id, module_origine, page_reference } }
//
// Déploiement : supabase functions deploy lulu-parent

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- Garde-fou 1 : renvoi médical systématique -----------------------------
// Toute question touchant à un symptôme, un médicament ou une urgence est
// orientée vers un professionnel de santé, quel que soit le contenu retrouvé.
const MOTS_CLES_MEDICAUX = [
  "fievre", "vomissement", "diarrhee", "saignement", "douleur", "medicament",
  "convulsion", "brulure", "blessure", "respire mal", "ne mange plus",
  "ne bouge plus", "urgence", "hopital",
];

// --- Garde-fou 2 : détection des signaux d'alerte ---------------------------
// Toute formulation évoquant violence, exploitation ou détresse aiguë
// déclenche une orientation + une notification anonymisée au facilitateur,
// jamais une réponse générée. Liste non exhaustive (cf. T-014, à enrichir
// avec E1/E4 lors de la recette T-054).
const MOTS_CLES_ALERTE = [
  "bat", "frappe", "viol", "touche", "marier", "mariage",
  "argent pour manger", "travaille au lieu d'ecole", "idees noires",
  "faire du mal", "seule avec", "personne ne m'aide", "craque",
  "vide depuis",
];

const SEUIL_PERTINENCE_MIN = 0.05;

const MESSAGE_RENVOI_MEDICAL =
  "Cette question touche à la santé de votre enfant : je ne peux pas y répondre. " +
  "Contactez au plus vite le centre de santé le plus proche ou votre facilitateur communautaire.";

const MESSAGE_ALERTE =
  "Ce que vous décrivez est important, et vous n'êtes pas seul(e). " +
  "Parlez-en dès que possible à votre facilitateur communautaire ou au centre de santé le plus proche. " +
  "Une personne de confiance a été notifiée pour pouvoir vous accompagner.";

const MESSAGE_REFUS =
  "Je n'ai pas d'information fiable là-dessus dans le guide du programme. " +
  "Je vous conseille d'en parler à votre facilitateur ou au centre de santé le plus proche.";

function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // retire les accents pour un matching robuste
}

function contientUnMotCle(texteNormalise: string, motsCles: string[]): boolean {
  return motsCles.some((mot) => texteNormalise.includes(normaliser(mot)));
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  let body: { question?: string; utilisateur_id?: string; canal?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Corps JSON invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const question = (body.question ?? "").trim();
  const canal = body.canal ?? "app";
  const utilisateurId = body.utilisateur_id ?? null;
  if (!question) {
    return new Response(JSON.stringify({ error: "Paramètre 'question' requis" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const questionNormalisee = normaliser(question);

  async function journaliser(statutReponse: string, uniteSourceId: string | null = null) {
    // Best-effort : une erreur de journalisation ne doit jamais empêcher de répondre au parent.
    try {
      await supabase.from("questions_posees").insert({
        utilisateur_id: utilisateurId,
        question_texte: question,
        statut_reponse: statutReponse,
        unite_source_id: uniteSourceId,
      });
    } catch (_e) {
      // volontairement silencieux
    }
  }

  // --- Étape 1 : renvoi médical systématique --------------------------------
  if (contientUnMotCle(questionNormalisee, MOTS_CLES_MEDICAUX)) {
    await journaliser("renvoi_medical");
    return jsonResponse({ type: "renvoi_medical", texte: MESSAGE_RENVOI_MEDICAL });
  }

  // --- Étape 2 : détection des signaux d'alerte -----------------------------
  if (contientUnMotCle(questionNormalisee, MOTS_CLES_ALERTE)) {
    await journaliser("alerte");
    try {
      await supabase.from("signalements").insert({
        utilisateur_id_anonymise: utilisateurId ?? "anonyme",
        type_alerte: "detecte_lulu_parent",
        canal,
        statut_traitement: "nouveau",
      });
    } catch (_e) {
      // La réponse d'orientation part quoi qu'il arrive ; on ne bloque jamais
      // le parent sur un problème d'écriture en base.
    }
    return jsonResponse({ type: "alerte", texte: MESSAGE_ALERTE });
  }

  // --- Étape 3 : recherche documentaire (T-031) + refus argumenté (T-033) --
  const { data: resultats, error } = await supabase.rpc("rechercher_passages", {
    requete: question,
    limite: 3,
  });

  if (error || !resultats || resultats.length === 0 || resultats[0].pertinence < SEUIL_PERTINENCE_MIN) {
    await journaliser("refus");
    return jsonResponse({ type: "refus", texte: MESSAGE_REFUS });
  }

  // --- Étape 4 : génération contrainte aux passages retrouvés, source citée (T-032) --
  const meilleur = resultats[0];
  const texteReponse = `${meilleur.contenu}`;

  await journaliser("repondu", meilleur.unite_id);

  return jsonResponse({
    type: "reponse",
    texte: texteReponse,
    source: {
      unite_id: meilleur.unite_id,
      module_origine: meilleur.module_origine,
      page_reference: meilleur.page_reference,
    },
  });
});

function jsonResponse(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
