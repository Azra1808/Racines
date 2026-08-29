// Canal SMS (M-S5 / T-075).
//
// Deux usages, volontairement distincts — et c'est la distinction qu'il faut
// savoir expliquer au jury :
//
//   1. L'ENVOI RÉEL, disponible aujourd'hui, sans aucune infrastructure.
//      Un facilitateur ouvre le conseil d'un module et l'envoie depuis son
//      propre téléphone, avec sa propre messagerie. Aucun serveur, aucune
//      passerelle, aucun coût pour le programme. C'est exactement le geste
//      qu'un relais communautaire fait déjà — on le rend juste instantané.
//
//   2. LA DIFFUSION EN MASSE, hors périmètre du MVP. Envoyer à mille parents
//      suppose une passerelle opérateur facturée au message. Le coût est
//      connu, il figure au budget, et il relève de la phase d'incubation.
//
// Comme pour l'USSD, ce fichier ne contient aucun contenu pédagogique : il
// met en forme le champ `resumeSms` déjà présent dans le modèle de contenu.

import { MODULES } from './modules';

// Un SMS standard fait 160 caractères en alphabet GSM. Au-delà, l'opérateur
// découpe en plusieurs messages — donc facture plusieurs messages. C'est
// pour cette contrainte que le champ `resumeSms` existe dans le modèle.
export const LIMITE_SMS = 160;

export const SIGNATURE = ' - RACINES';

/**
 * Compose le SMS d'un module : le conseil, puis la signature du programme
 * si elle tient. Un parent qui reçoit un message doit savoir d'où il vient.
 */
export function composerSms(unite) {
  const avecSignature = `${unite.resumeSms}${SIGNATURE}`;
  return avecSignature.length <= LIMITE_SMS ? avecSignature : unite.resumeSms;
}

/**
 * Nombre de SMS que l'opérateur facturera pour ce message.
 * Sert à afficher honnêtement le coût réel d'une diffusion.
 */
export function nombreDeSms(texte) {
  return Math.max(1, Math.ceil(texte.length / LIMITE_SMS));
}

/**
 * Lien `sms:` ouvrant la messagerie du téléphone, pré-remplie.
 *
 * L'encodage n'est pas un détail : sans lui, un conseil contenant une
 * apostrophe ou un accent arrive tronqué chez le parent.
 */
export function lienSms(texte, numero = '') {
  return `sms:${numero}?body=${encodeURIComponent(texte)}`;
}

/**
 * Programme de rappels hebdomadaires : un module par semaine, dans l'ordre
 * du guide. C'est la forme que prendrait la diffusion en masse — on peut
 * donc la montrer et la chiffrer sans l'avoir déployée.
 */
export function sequenceRappels(nbSemaines = MODULES.length) {
  return MODULES.slice(0, nbSemaines).map((unite, i) => ({
    semaine: i + 1,
    uniteId: unite.id,
    titre: unite.titre,
    texte: composerSms(unite),
  }));
}
