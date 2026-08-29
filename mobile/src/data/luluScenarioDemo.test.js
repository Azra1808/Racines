import { trouverReponse } from './luluResponses';
import { MODULES } from './modules';

// Le scénario de démonstration, verrouillé.
//
// Ces phrases sont celles que l'équipe tape devant le jury et devant la
// caméra. Si l'une d'elles cesse de router au bon endroit — parce qu'un
// mot-clé a bougé, ou qu'un module a été renommé — la démonstration casse en
// direct. Ce fichier fait échouer la compilation avant que cela n'arrive.
//
// Toute phrase ajoutée ici doit avoir été essayée dans l'application.

const SCENARIO = [
  ['mon enfant est handicapé, comment l\'aider', 'u01-voir-enfant-autrement'],
  ['comment la communauté peut protéger les enfants', 'u02-proteger-affaire-de-tous'],
  ['est-ce que crier sur mon enfant abîme son cerveau', 'u03-cerveau-grandit-amour'],
  ['jusqu\'à quel âge allaiter mon bébé', 'u04-1000-premiers-jours'],
  ['comment mieux écouter mon enfant', 'u05-parler-a-son-enfant'],
  ['comment punir sans frapper', 'u06-discipliner-sans-punir'],
  ['le mariage des enfants, c\'est quoi', 'u07-pratiques-nefastes'],
  ['mon ado ne me parle plus', 'u08-accompagner-adolescent'],
  ['comment prévoir le budget scolaire', 'u09-planifier-budget-enfant'],
  ['je suis épuisée, je n\'en peux plus', 'u10-prendre-soin-de-soi'],
];

describe('scénario de démonstration de Lulu', () => {
  it.each(SCENARIO)('« %s » ouvre le bon module', (phrase, moduleAttendu) => {
    const reponse = trouverReponse(phrase);
    expect(reponse).not.toBeNull();
    expect(reponse.moduleId).toBe(moduleAttendu);
    // Le module cité doit exister réellement dans le corpus.
    expect(MODULES.some((m) => m.id === moduleAttendu)).toBe(true);
  });

  it('couvre les 10 modules du corpus, sans doublon', () => {
    const cibles = SCENARIO.map(([, id]) => id);
    expect(new Set(cibles).size).toBe(cibles.length);
    expect(new Set(cibles)).toEqual(new Set(MODULES.map((m) => m.id)));
  });

  it('montre les trois garde-fous', () => {
    const alerte = trouverReponse('mon mari me bat devant les enfants');
    expect(alerte.type).toBe('urgence');
    expect(alerte.reponse).toMatch(/facilitateur/);

    const medical = trouverReponse('mon bébé ne respire plus');
    expect(medical.type).toBe('urgence');
    expect(medical.reponse).toMatch(/centre de santé/);

    // Hors corpus : Lulu n'invente pas, il n'a simplement pas de règle.
    expect(trouverReponse('quelle est la capitale du Cameroun')).toBeNull();
  });
});
