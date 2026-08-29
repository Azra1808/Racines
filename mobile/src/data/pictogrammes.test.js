import { PICTO_ICON_KEYS } from '../components/icons/PictoIcon';
import { MODULES } from './modules';

// Depuis le remplacement des émojis par des icônes vectorielles, un
// pictogramme sans icône correspondante s'affiche comme un point
// d'interrogation générique. Ce n'est pas une erreur bruyante : elle passe
// inaperçue jusqu'à ce qu'un jury tombe dessus.
//
// Ce test relie le contenu (modules.js) au rendu (PictoIcon.js) : ajouter un
// pictogramme sans dessiner son icône fait échouer la compilation.
describe('pictogrammes du mode lecture simplifiée', () => {
  it('dispose d\'une icône pour chaque pictogramme du corpus', () => {
    const connus = new Set(PICTO_ICON_KEYS);
    const utilises = new Set(MODULES.flatMap((m) => m.pictogrammes ?? []));
    const orphelins = [...utilises].filter((p) => !connus.has(p)).sort();
    expect(orphelins).toEqual([]);
  });

  it('donne des pictogrammes à chaque module, pour le mode simplifié', () => {
    for (const module of MODULES) {
      expect(Array.isArray(module.pictogrammes)).toBe(true);
      expect(module.pictogrammes.length).toBeGreaterThan(0);
    }
  });
});
