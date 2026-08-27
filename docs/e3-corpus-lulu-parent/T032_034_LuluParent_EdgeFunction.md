# T-032 / T-033 / T-034 — Code de l'Edge Function Lulu Parent

C'est l'étape 4 de T-015 : le code qui applique les 3 garde-fous (renvoi médical, alerte, refus argumenté) et sinon répond à partir du corpus indexé.

## Fichier à créer : `supabase/functions/lulu-parent/index.ts`

```typescript
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

const MOTS_MEDICAUX = ["fièvre", "vomissement", "diarrhée", "saignement", "douleur",
  "médicament", "convulsion", "brûlure", "blessure", "respire mal",
  "ne mange plus", "ne bouge plus", "urgence", "hôpital"];

const MOTS_ALERTE = ["bat", "frappe", "viol", "touché", "marier", "mariage",
  "argent pour manger", "travaille au lieu d'école", "idées noires",
  "faire du mal", "seule avec", "personne ne m'aide", "craque", "vide depuis"];

function contientMotCle(texte: string, mots: string[]): boolean {
  const t = texte.toLowerCase();
  return mots.some((m) => t.includes(m));
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  try {
    const { question, utilisateur_id, canal } = await req.json();
    if (!question) return json({ erreur: "question manquante" }, 400);

    // 1. Renvoi médical systématique — prioritaire sur tout le reste
    if (contientMotCle(question, MOTS_MEDICAUX)) {
      await supabase.from("questions_posees").insert({
        utilisateur_id: utilisateur_id ?? null,
        question_texte: question,
        statut_reponse: "renvoi_medical",
      });
      return json({
        type: "renvoi_medical",
        reponse: "Cette question concerne la santé de votre enfant. Merci de contacter un professionnel de santé ou le centre de santé le plus proche.",
      });
    }

    // 2. Détection des signaux d'alerte
    if (contientMotCle(question, MOTS_ALERTE)) {
      await supabase.from("signalements").insert({
        utilisateur_id_anonymise: utilisateur_id ?? "anonyme",
        type_alerte: "detresse_parent",
        canal: canal ?? "app",
      });
      await supabase.from("questions_posees").insert({
        utilisateur_id: utilisateur_id ?? null,
        question_texte: question,
        statut_reponse: "alerte",
      });
      return json({
        type: "alerte",
        reponse: "Ce que vous décrivez est important. Parlez-en à votre facilitateur communautaire ou contactez un centre d'aide dès que possible. Vous n'êtes pas seul(e).",
      });
    }

    // 3. Recherche dans le corpus fermé (fonction SQL créée à l'étape 3 de T-015)
    const { data: passages, error } = await supabase.rpc("rechercher_passages", {
      requete: question,
      limite: 3,
    });
    if (error) return json({ erreur: error.message }, 500);

    const meilleur = passages?.[0];
    if (!meilleur || meilleur.pertinence < 0.05) {
      await supabase.from("questions_posees").insert({
        utilisateur_id: utilisateur_id ?? null,
        question_texte: question,
        statut_reponse: "refus",
      });
      return json({
        type: "refus",
        reponse: "Je n'ai pas d'information fiable là-dessus dans le guide du programme. Je vous conseille d'en parler à votre facilitateur ou au centre de santé le plus proche.",
      });
    }

    // 4. Réponse construite à partir du passage retrouvé, avec citation systématique
    await supabase.from("questions_posees").insert({
      utilisateur_id: utilisateur_id ?? null,
      question_texte: question,
      unite_source_id: meilleur.unite_id,
      statut_reponse: "repondu",
    });

    return json({
      type: "reponse",
      reponse: meilleur.contenu,
      source: meilleur.module_origine,
    });
  } catch (e) {
    return json({ erreur: String(e) }, 500);
  }
});
```

## Déploiement (à faire par Michou ou Krys, depuis un ordinateur)

```bash
supabase functions new lulu-parent
# coller le code ci-dessus dans supabase/functions/lulu-parent/index.ts
supabase functions deploy lulu-parent
```

## Test après déploiement (T-032/033/034 — captures à garder comme preuve)

```bash
# Cas 1 : réponse normale avec source
curl -X POST https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/lulu-parent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_ANON" \
  -d '{"question":"mon enfant refuse de manger des légumes","canal":"app"}'

# Cas 2 : renvoi médical
curl -X POST https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/lulu-parent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_ANON" \
  -d '{"question":"mon bébé a une forte fièvre depuis hier","canal":"app"}'

# Cas 3 : alerte / signalement
curl -X POST https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/lulu-parent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_ANON" \
  -d '{"question":"mon mari me bat devant les enfants","canal":"app"}'

# Cas 4 : refus hors corpus
curl -X POST https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/lulu-parent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_ANON" \
  -d '{"question":"quelle est la capitale du Cameroun","canal":"app"}'
```

Après le test, vérifier dans Supabase que `questions_posees` et `signalements` se sont bien remplis (`select * from questions_posees order by date desc limit 5;`).
