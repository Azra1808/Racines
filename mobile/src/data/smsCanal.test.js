import {
  composerSms, nombreDeSms, lienSms, sequenceRappels, LIMITE_SMS,
} from './smsCanal';
import { MODULES } from './modules';

describe('canal SMS', () => {
  it('tient dans un seul SMS pour chaque module du corpus', () => {
    // Si ce test casse, ce n'est pas le canal qui a un problème : c'est un
    // resumeSms devenu trop long, et l'opérateur facturera double.
    for (const unite of MODULES) {
      const texte = composerSms(unite);
      expect(texte.length).toBeLessThanOrEqual(LIMITE_SMS);
      expect(nombreDeSms(texte)).toBe(1);
    }
  });

  it('signe le message quand la place le permet, sans jamais couper le conseil', () => {
    for (const unite of MODULES) {
      const texte = composerSms(unite);
      // Le conseil est toujours intégralement présent.
      expect(texte).toContain(unite.resumeSms);
      expect(texte).not.toContain('…');
    }
  });

  it('encode le lien sms: pour que les accents arrivent intacts', () => {
    const lien = lienSms("Écoutez votre enfant, c'est déjà l'aider.");
    expect(lien.startsWith('sms:?body=')).toBe(true);
    // Les accents et les espaces sont encodés : ce sont eux qui cassent le
    // message. (L'apostrophe est un caractère licite dans une URL et passe
    // telle quelle — ce n'est pas un défaut.)
    expect(lien).not.toContain('é');
    expect(lien).not.toContain(' ');
    // Ce qui compte vraiment : le message se reconstruit à l'identique
    // côté messagerie du téléphone.
    expect(decodeURIComponent(lien.split('?body=')[1]))
      .toBe("Écoutez votre enfant, c'est déjà l'aider.");
  });

  it('accepte un numéro de destinataire', () => {
    expect(lienSms('Bonjour', '+237600000000').startsWith('sms:+237600000000?body=')).toBe(true);
  });

  it('produit un programme de rappels, un module par semaine', () => {
    const sequence = sequenceRappels();
    expect(sequence).toHaveLength(MODULES.length);
    expect(sequence[0].semaine).toBe(1);
    expect(sequence[0].titre).toBe(MODULES[0].titre);
    for (const rappel of sequence) {
      expect(rappel.texte.length).toBeLessThanOrEqual(LIMITE_SMS);
    }
  });
});
