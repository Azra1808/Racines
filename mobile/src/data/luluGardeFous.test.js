import { trouverReponse, LULU_RULES } from './luluResponses';
import { MODULES } from './modules';

// Les 10 formulations de détresse rédigées en T-014 (Sprint 0) et chargées
// dans la table `formulations_test`. Ce sont les phrases telles qu'un parent
// les écrirait — pas le vocabulaire d'un guide institutionnel.
//
// Défaut constaté le 29/08 : « Mon mari me bat devant les enfants » ne
// déclenchait aucune alerte, parce que la liste contenait « frappé » et non
// « frappe », et qu'aucune normalisation d'accents n'était appliquée.
// Ce fichier verrouille les 10 cas.
const FORMULATIONS_DETRESSE = [
  'Mon mari me bat devant les enfants, je ne sais plus quoi faire.',
  "J'ai des idées noires, parfois je me demande si je suis capable de faire du mal à mon bébé tellement je suis fatiguée.",
  "On veut marier ma fille de 14 ans, je n'arrive pas à m'y opposer.",
  "Je n'ai plus d'argent pour nourrir mes enfants correctement.",
  "Mon fils de 10 ans travaille au lieu d'aller à l'école, on n'a pas le choix.",
  "Je crois que ma fille a été touchée par quelqu'un de la famille.",
  "Je frappe mes enfants plus fort que je le voudrais, je n'arrive plus à me contrôler.",
  "Depuis l'accouchement je me sens vide, je n'arrive plus à m'occuper d'elle.",
  'Personne ne m\'aide, je suis seule avec quatre enfants et je craque.',
  "Mon mari a interdit à notre fils d'aller à l'hôpital même malade.",
];

const URGENCES_MEDICALES = [
  'Mon bébé ne respire plus, aidez-moi',
  'Elle a perdu connaissance après être tombée',
  'Il saigne beaucoup depuis ce matin',
  'Mon fils fait une convulsion',
];

// Questions parfaitement légitimes qui ne doivent PAS déclencher d'alerte :
// c'est le risque symétrique. Une alerte à tort détourne un parent de la
// réponse pédagogique dont il a besoin.
const QUESTIONS_LEGITIMES = [
  'comment discipliner mon enfant sans le frapper',
  'Comment punir sans crier ni frapper ?',
  'Est-ce que je peux le corriger fermement s\'il n\'écoute pas ?',
  'Comment parler à mon adolescent ?',
  'Mon enfant refuse de manger des légumes',
];

describe('garde-fous de Lulu Parent', () => {
  it.each(FORMULATIONS_DETRESSE)(
    'oriente vers une aide humaine — « %s »',
    (formulation) => {
      const reponse = trouverReponse(formulation);
      expect(reponse).not.toBeNull();
      expect(reponse.type).toBe('urgence');
      // Une alerte n'oriente jamais vers un module de lecture.
      expect(reponse.moduleId).toBeUndefined();
    }
  );

  it.each(URGENCES_MEDICALES)(
    'renvoie vers un service de santé — « %s »',
    (formulation) => {
      const reponse = trouverReponse(formulation);
      expect(reponse.type).toBe('urgence');
      expect(reponse.reponse).toMatch(/centre de santé|urgence/i);
    }
  );

  it.each(QUESTIONS_LEGITIMES)(
    'ne crie pas au loup sur une question ordinaire — « %s »',
    (question) => {
      const reponse = trouverReponse(question);
      // Soit un module, soit rien — jamais une alerte.
      expect(reponse?.type).not.toBe('urgence');
    }
  );

  // Constaté le 29/08 : les modules U09 et U10, ajoutés au corpus, n'avaient
  // aucune règle. Un parent posant une question sur le budget ou la fatigue
  // recevait « je n'ai pas de réponse » alors que le module existait.
  it('sait orienter vers chacun des modules du corpus', () => {
    const cibles = new Set(LULU_RULES.map((r) => r.moduleId));
    const orphelins = MODULES.filter((m) => !cibles.has(m.id)).map((m) => m.titre);
    expect(orphelins).toEqual([]);
  });

  it('ne référence aucun module qui n\'existe plus', () => {
    const idsReels = new Set(MODULES.map((m) => m.id));
    for (const regle of LULU_RULES) {
      expect(idsReels.has(regle.moduleId)).toBe(true);
    }
  });

  it('ne dépend pas des accents ni des apostrophes', () => {
    for (const variante of [
      'mon mari me frappe',
      'mon mari me frappe',
      'j ai des idees noires',
      "j'ai des idées noires",
    ]) {
      expect(trouverReponse(variante)?.type).toBe('urgence');
    }
  });
});
