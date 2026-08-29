import { TRADUCTIONS, LANGUES } from './LanguageContext';

// Le français est la référence : toute clé qu'il porte doit exister en
// anglais, faute de quoi un parent anglophone tombe sur du français au
// milieu d'un écran anglais.
//
// L'ewondo et le bassa sont volontairement partiels : leurs traductions
// doivent être validées par un locuteur natif avant diffusion (règle du plan
// §8.5, « aucune traduction automatique diffusée »). Ce test mesure leur
// couverture sans la rendre bloquante, et vérifie que l'application prévient
// honnêtement l'utilisateur.
const COMPLETES = ['fr', 'en'];

describe('dictionnaire de traduction', () => {
  const reference = Object.keys(TRADUCTIONS.fr);

  it('couvre un nombre significatif de clés', () => {
    expect(reference.length).toBeGreaterThan(100);
  });

  it.each(COMPLETES)('la langue « %s » ne laisse aucune clé de côté', (code) => {
    const manquantes = reference.filter((cle) => TRADUCTIONS[code][cle] === undefined);
    expect(manquantes).toEqual([]);
  });

  it.each(COMPLETES)('la langue « %s » n\'introduit pas de clé inconnue', (code) => {
    const surplus = Object.keys(TRADUCTIONS[code]).filter((cle) => !reference.includes(cle));
    expect(surplus).toEqual([]);
  });

  it('conserve les mêmes variables entre le français et l\'anglais', () => {
    // « Question {n} / {total} » doit avoir les mêmes variables partout,
    // sinon la phrase traduite affiche un trou à l'écran.
    const variables = (texte) => (texte.match(/\{(\w+)\}/g) ?? []).sort().join(',');
    for (const cle of reference) {
      expect(variables(TRADUCTIONS.en[cle])).toBe(variables(TRADUCTIONS.fr[cle]));
    }
  });

  it('déclare toutes les langues proposées dans le sélecteur', () => {
    for (const langue of LANGUES) {
      expect(TRADUCTIONS[langue.id]).toBeDefined();
    }
  });

  it('signale les langues partiellement traduites', () => {
    const partielles = LANGUES.map((l) => l.id).filter((id) => !COMPLETES.includes(id));
    for (const code of partielles) {
      const couverture = reference.filter((c) => TRADUCTIONS[code][c] !== undefined).length;
      // Elles doivent au moins couvrir la navigation de base.
      expect(couverture).toBeGreaterThan(20);
    }
    // Et l'application doit pouvoir le dire à l'utilisateur.
    expect(TRADUCTIONS.fr.lang_partial_notice).toBeTruthy();
    expect(TRADUCTIONS.en.lang_partial_notice).toBeTruthy();
  });
});
