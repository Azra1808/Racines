import {
  resoudreEcranUssd,
  indexConseilDuJour,
  LIMITE_CARACTERES_USSD,
  sansAccents,
} from './ussdMenu';
import { MODULES } from './modules';

describe('menu USSD', () => {
  it('ouvre la session sur le menu racine à 4 entrées', () => {
    const ecran = resoudreEcranUssd([]);
    expect(ecran.type).toBe('CON');
    expect(ecran.texte).toContain('1. Conseil du jour');
    expect(ecran.texte).toContain("4. M'inscrire");
  });

  it('sert le conseil du jour depuis le contenu réel des modules', () => {
    const ecran = resoudreEcranUssd(['1']);
    const unite = MODULES[indexConseilDuJour()];
    expect(ecran.type).toBe('END');
    // Le canal ne réécrit rien : il réutilise le résumé SMS du modèle central.
    expect(ecran.texte).toContain(unite.resumeSms.slice(0, 40));
  });

  it('pagine le catalogue et ouvre le module choisi', () => {
    const liste = resoudreEcranUssd(['2']);
    expect(liste.type).toBe('CON');
    expect(liste.texte).toContain('5. Suivant');

    const choix = resoudreEcranUssd(['2', '1']);
    expect(choix.type).toBe('END');
    expect(choix.texte).toContain(MODULES[0].titre);

    // « 5 » = page suivante : le 1er de la page 2 est le 5e module.
    const page2 = resoudreEcranUssd(['2', '5', '1']);
    expect(page2.texte).toContain(MODULES[4].titre);
  });

  it('corrige le quiz et annonce la bonne réponse en cas d\'erreur', () => {
    const unite = MODULES[indexConseilDuJour()];
    const question = unite.quiz[0];
    const bonne = String(question.correctIndex + 1);
    const mauvaise = String(((question.correctIndex + 1) % question.options.length) + 1);

    expect(resoudreEcranUssd(['3', bonne]).texte).toContain('Bonne reponse');

    const echec = resoudreEcranUssd(['3', mauvaise]);
    expect(echec.texte).toContain('Pas tout a fait');
    expect(echec.texte).toContain(question.options[question.correctIndex]);
  });

  it('refuse une option inconnue sans jamais inventer de contenu', () => {
    expect(resoudreEcranUssd(['9']).type).toBe('END');
    expect(resoudreEcranUssd(['9']).texte).toContain('invalide');
  });

  it('respecte la limite de 182 caractères sur tous les écrans du parcours', () => {
    const parcours = [
      [], ['1'], ['2'], ['2', '1'], ['2', '5'], ['3'], ['4'], ['4', '1'], ['9'],
    ];
    for (const etapes of parcours) {
      const { texte } = resoudreEcranUssd(etapes);
      expect(sansAccents(texte).length).toBeLessThanOrEqual(LIMITE_CARACTERES_USSD);
    }
  });

  // Défaut constaté le 29/08 sur l'écran « cinq portes » : 4 modules sur 8
  // affichaient un conseil coupé par « … », parce que titre + résumé
  // dépassaient 182 caractères. Un parent perdait la fin de l'information.
  it('n\'ampute jamais le conseil, quel que soit le module choisi', () => {
    for (let position = 0; position < MODULES.length; position += 1) {
      const page = Math.floor(position / 4);
      const rang = String((position % 4) + 1);
      const etapes = ['2', ...Array(page).fill('5'), rang];

      const { texte } = resoudreEcranUssd(etapes);
      const affiche = sansAccents(texte);

      expect(affiche.length).toBeLessThanOrEqual(LIMITE_CARACTERES_USSD);
      expect(affiche).not.toContain('…');
      // Le conseil doit toujours être présent en entier, titre ou pas.
      expect(affiche).toContain(sansAccents(MODULES[position].resumeSms));
    }
  });

  it('garde chaque résumé SMS sous la limite d\'un écran USSD', () => {
    // Invariant du modèle de contenu : un resumeSms tient dans un SMS (160)
    // donc a fortiori dans un écran USSD (182). Si un jour ce test casse,
    // c'est le contenu qui a dérivé, pas le canal.
    for (const unite of MODULES) {
      expect(sansAccents(unite.resumeSms).length).toBeLessThanOrEqual(LIMITE_CARACTERES_USSD);
    }
  });

  it('retire les accents, que les combinés basiques affichent mal', () => {
    expect(sansAccents('éàçûî')).toBe('eacui');
  });
});
