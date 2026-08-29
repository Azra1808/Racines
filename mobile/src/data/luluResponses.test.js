import { LULU_FALLBACK, trouverReponse } from './luluResponses';

describe('trouverReponse', () => {
  it('oriente une demande de discipline vers le module validé', () => {
    const resultat = trouverReponse('Comment discipliner sans punir mon enfant ?');

    expect(resultat).toMatchObject({
      moduleId: 'u06-discipliner-sans-punir',
    });
  });

  it('priorise la sécurité avant les règles de contenu', () => {
    const resultat = trouverReponse('Mon enfant ne respire plus, que dois-je faire ?');

    expect(resultat).toMatchObject({ type: 'urgence' });
    expect(resultat.moduleId).toBeUndefined();
    expect(resultat.reponse).toContain('Lulu ne peut pas gérer une urgence');
  });

  it('ne fabrique pas une réponse lorsque la question est hors corpus', () => {
    expect(trouverReponse('Quel est le meilleur jouet spatial ?')).toBeNull();
    expect(LULU_FALLBACK).toContain('réponse fiable');
  });
});
