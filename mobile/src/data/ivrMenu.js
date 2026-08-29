// Serveur vocal (IVR) — T-048 / T-049.
//
// Même principe que le canal USSD : ce fichier ne contient aucun contenu
// pédagogique. Il assemble les scripts audio déjà présents dans MODULES
// (champ `scriptAudioIvr`, 45 secondes maximum, rédigé au Sprint 0).
//
// Ce canal n'est pas une option d'accessibilité ajoutée après coup : c'est le
// seul canal utilisable par un parent non lettré ou malvoyant (dossier §5.4).
// Il sert donc simultanément trois critères : Handicap, Accessibilité et
// Pertinence locale.

import { MODULES } from './modules';
import { indexConseilDuJour } from './ussdMenu';

export const NUMERO_VOCAL = '8080';

// Langues du parcours vocal.
// « disponible » = restituable aujourd'hui par la synthèse vocale embarquée.
// Les langues locales exigent l'enregistrement d'un locuteur natif identifié
// (aucune traduction automatique diffusée — règle du plan §8.5). Elles sont
// affichées comme feuille de route datée, jamais comme une promesse tenue.
export const LANGUES = [
  { code: 'fr-FR', nom: 'Français', disponible: true },
  { code: 'ewo', nom: 'Ewondo', disponible: false, note: 'Enregistrement locuteur natif' },
  { code: 'fub', nom: 'Fulfulde', disponible: false, note: 'Enregistrement locuteur natif' },
  { code: 'en-US', nom: 'English', disponible: false, note: 'Traduction en cours' },
];

const ACCUEIL =
  "Bienvenue chez RACINES, le programme de parentalité positive. " +
  "Pour écouter le conseil du jour, tapez 1. " +
  "Pour choisir un thème, tapez 2. " +
  "Pour être rappelé par un facilitateur, tapez 3.";

const MENU_THEMES_INTRO = 'Choisissez un thème. ';

// Un menu vocal ne peut pas énumérer dix thèmes : au-delà de quatre, le
// parent a oublié le premier avant la fin de l'annonce. On en annonce
// quatre, et on n'accepte que ceux-là.
const NB_THEMES_ANNONCES = 4;

function themesAnnonces() {
  return MODULES.slice(0, NB_THEMES_ANNONCES);
}
const RAPPEL_FACILITATEUR =
  "Votre demande est enregistrée. Un facilitateur de votre communauté vous " +
  "rappellera. Si la situation est urgente, rendez-vous au centre de santé le " +
  "plus proche. Merci et à bientôt.";

const AU_REVOIR = "Merci d'avoir appelé RACINES. Prenez soin de vous et de votre enfant.";

/**
 * Résout l'état du serveur vocal à partir des touches composées.
 *
 * @param {string[]} etapes touches DTMF saisies depuis le début de l'appel
 * @returns {{ texte: string, enCours: boolean, aide: string }}
 *   texte   : ce que le serveur prononce (et affiche en transcription)
 *   enCours : false = le serveur raccroche
 *   aide    : rappel des touches actives, affiché sous le combiné
 */
export function resoudreEtapeIvr(etapes) {
  const [choix, ...suite] = etapes;

  if (!choix) {
    return {
      texte: ACCUEIL,
      enCours: true,
      aide: '1 · 2 · 3   —   0 pour réécouter',
    };
  }

  if (choix === '1') {
    const unite = MODULES[indexConseilDuJour()];
    return {
      texte: `Conseil du jour. ${unite.titre}. ${unite.scriptAudioIvr} ${AU_REVOIR}`,
      enCours: false,
      aide: 'Fin de l\'appel',
    };
  }

  if (choix === '2') {
    const theme = suite[0];

    if (!theme) {
      // Un menu vocal ne s'écoute pas comme une liste écrite : on annonce
      // les thèmes un par un, numérotés, comme le ferait un vrai serveur.
      const annonce = themesAnnonces()
        .map((unite, i) => `Pour ${unite.thematique}, tapez ${i + 1}.`)
        .join(' ');
      return {
        texte: `${MENU_THEMES_INTRO}${annonce}`,
        enCours: true,
        aide: `1 à ${themesAnnonces().length}   —   0 pour réécouter`,
      };
    }

    // On n'accepte que ce qui a été annoncé à voix haute. Sans cette borne,
    // l'ajout de modules au corpus rendrait accessibles des touches dont le
    // parent n'a jamais entendu parler.
    const unite = themesAnnonces()[Number(theme) - 1];
    if (!unite) {
      return {
        texte: `Ce choix n'existe pas. ${AU_REVOIR}`,
        enCours: false,
        aide: 'Fin de l\'appel',
      };
    }
    return {
      texte: `${unite.titre}. ${unite.scriptAudioIvr} ${AU_REVOIR}`,
      enCours: false,
      aide: 'Fin de l\'appel',
    };
  }

  if (choix === '3') {
    return { texte: RAPPEL_FACILITATEUR, enCours: false, aide: 'Fin de l\'appel' };
  }

  return {
    texte: `Ce choix n'existe pas. ${AU_REVOIR}`,
    enCours: false,
    aide: 'Fin de l\'appel',
  };
}
