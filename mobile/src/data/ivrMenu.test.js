import { resoudreEtapeIvr, LANGUES, NUMERO_VOCAL } from './ivrMenu';
import { indexConseilDuJour } from './ussdMenu';
import { MODULES } from './modules';

describe('serveur vocal IVR', () => {
  it('accueille en annonçant les trois choix', () => {
    const etat = resoudreEtapeIvr([]);
    expect(etat.enCours).toBe(true);
    expect(etat.texte).toContain('tapez 1');
    expect(etat.texte).toContain('tapez 3');
  });

  it('lit le script audio du module, pas le corps applicatif', () => {
    const etat = resoudreEtapeIvr(['1']);
    const unite = MODULES[indexConseilDuJour()];
    // Le canal vocal réutilise le champ dédié : 45 s, écrit pour l'oreille.
    expect(etat.texte).toContain(unite.scriptAudioIvr);
    expect(etat.texte).not.toContain(unite.corpsApp);
    expect(etat.enCours).toBe(false);
  });

  it('annonce les thèmes un par un, puis lit celui qu\'on choisit', () => {
    const menu = resoudreEtapeIvr(['2']);
    expect(menu.enCours).toBe(true);
    expect(menu.texte).toContain(MODULES[0].thematique);

    const choix = resoudreEtapeIvr(['2', '2']);
    expect(choix.texte).toContain(MODULES[1].scriptAudioIvr);
    expect(choix.enCours).toBe(false);
  });

  it('oriente vers un facilitateur et rappelle le recours urgent', () => {
    const etat = resoudreEtapeIvr(['3']);
    expect(etat.texte).toContain('facilitateur');
    expect(etat.texte).toContain('centre de santé');
    expect(etat.enCours).toBe(false);
  });

  it('raccroche proprement sur un choix inconnu, sans rien inventer', () => {
    for (const touche of ['7', '9', '#']) {
      const etat = resoudreEtapeIvr([touche]);
      expect(etat.texte).toContain("n'existe pas");
      expect(etat.enCours).toBe(false);
    }
    expect(resoudreEtapeIvr(['2', '9']).texte).toContain("n'existe pas");
  });

  it('ne déclare disponible que le français, les langues locales restant à enregistrer', () => {
    const disponibles = LANGUES.filter((l) => l.disponible).map((l) => l.nom);
    expect(disponibles).toEqual(['Français']);
    // Toute langue annoncée mais non disponible doit porter sa raison :
    // c'est ce qui distingue une feuille de route d'une promesse vague.
    for (const langue of LANGUES.filter((l) => !l.disponible)) {
      expect(langue.note).toBeTruthy();
    }
  });

  it('expose un numéro vocal court, mémorisable par un parent', () => {
    expect(NUMERO_VOCAL).toMatch(/^\d{4}$/);
  });
});
