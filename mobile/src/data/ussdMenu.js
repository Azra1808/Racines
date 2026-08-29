// Arbre de menu USSD (T-036) — alimenté par LE MÊME contenu que l'application.
//
// Principe architectural du dossier (§5.1) : un canal n'est pas un produit
// séparé, c'est un adaptateur. Ce fichier ne contient AUCUN contenu
// pédagogique : il ne fait que sélectionner les champs déjà présents dans
// MODULES (resumeSms, quiz) et les mettre au format USSD.
//
// Protocole respecté (identique à un vrai agrégateur télécom) :
//   CON <texte>  → la session continue, le parent peut encore saisir
//   END <texte>  → la session se termine
//
// Contrainte réelle d'un écran USSD : 182 caractères. Elle est calculée et
// affichée dans le simulateur, car c'est cette contrainte qui justifie le
// champ « resumeSms » du modèle de contenu central.

import { MODULES } from './modules';

export const CODE_COURT = '*123#';
export const LIMITE_CARACTERES_USSD = 182;

// Le conseil du jour tourne sur les 8 unités, sans stockage serveur :
// l'index dérive du quantième du jour. Deux téléphones le même jour
// affichent donc le même conseil — comportement attendu d'un vrai service.
export function indexConseilDuJour(date = new Date()) {
  const debutAnnee = new Date(date.getFullYear(), 0, 0);
  const jourDeLAnnee = Math.floor((date - debutAnnee) / 86400000);
  return jourDeLAnnee % MODULES.length;
}

function tronquer(texte, limite = LIMITE_CARACTERES_USSD) {
  if (texte.length <= limite) return texte;
  return `${texte.slice(0, limite - 1).trimEnd()}…`;
}

const MENU_RACINE =
  'RACINES - Parentalite positive\n' +
  '1. Conseil du jour\n' +
  '2. Choisir un module\n' +
  '3. Quiz du jour\n' +
  "4. M'inscrire";

// Un écran USSD ne gère pas les accents sur beaucoup de combinés basiques.
// On les retire à l'affichage : détail réaliste, et honnête vis-à-vis du jury.
function sansAccents(texte) {
  return texte.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/**
 * Résout un état de session USSD à partir de la suite de touches saisies,
 * exactement comme le ferait un agrégateur : la chaîne « text » accumule
 * les choix séparés par « * » depuis le début de la session.
 *
 * @param {string[]} etapes  ex. ['3', '1'] = « Quiz » puis réponse 1
 * @returns {{ type: 'CON'|'END', texte: string }}
 */
export function resoudreEcranUssd(etapes) {
  const [choix, ...suite] = etapes;

  if (!choix) {
    return { type: 'CON', texte: MENU_RACINE };
  }

  // --- 1. Conseil du jour --------------------------------------------------
  if (choix === '1') {
    const unite = MODULES[indexConseilDuJour()];
    return {
      type: 'END',
      texte: tronquer(`Conseil du jour\n${unite.resumeSms}`),
    };
  }

  // --- 2. Catalogue des modules, paginé 4 par 4 ----------------------------
  if (choix === '2') {
    return resoudreCatalogue(suite);
  }

  // --- 3. Quiz du jour -----------------------------------------------------
  if (choix === '3') {
    const unite = MODULES[indexConseilDuJour()];
    const question = unite.quiz[0];
    const reponse = suite[0];

    if (!reponse) {
      const options = question.options
        .map((option, i) => `${i + 1}. ${option}`)
        .join('\n');
      return { type: 'CON', texte: tronquer(`${question.question}\n${options}`) };
    }

    const indexChoisi = Number(reponse) - 1;
    if (Number.isNaN(indexChoisi) || !question.options[indexChoisi]) {
      return { type: 'END', texte: 'Choix invalide. Rappelez ' + CODE_COURT };
    }

    const correct = indexChoisi === question.correctIndex;
    return {
      type: 'END',
      texte: tronquer(
        correct
          ? `Bonne reponse !\n${unite.resumeSms}`
          : `Pas tout a fait.\nLa bonne reponse : ${question.options[question.correctIndex]}`
      ),
    };
  }

  // --- 4. Inscription ------------------------------------------------------
  if (choix === '4') {
    const commune = suite[0];
    if (!commune) {
      return {
        type: 'CON',
        texte:
          'Inscription aux rappels\n' +
          'Entrez le numero de votre commune :\n' +
          '1. Yaounde\n2. Douala\n3. Garoua\n4. Autre',
      };
    }
    return {
      type: 'END',
      texte:
        'Inscription enregistree. Vous recevrez un conseil par semaine.\n' +
        'Un facilitateur de votre zone pourra vous contacter.',
    };
  }

  return { type: 'END', texte: `Option invalide. Rappelez ${CODE_COURT}` };
}

function resoudreCatalogue(suite) {
  const TAILLE_PAGE = 4;
  // Chaque « 5 » saisi = « Suivant », donc page suivante.
  const page = suite.filter((t) => t === '5').length;
  const selection = suite.find((t) => t !== '5');

  if (selection) {
    const index = Number(selection) - 1;
    const debut = page * TAILLE_PAGE;
    const unite = MODULES[debut + index];
    if (!unite) {
      return { type: 'END', texte: `Option invalide. Rappelez ${CODE_COURT}` };
    }
    return {
      type: 'END',
      texte: tronquer(`${unite.titre}\n${unite.resumeSms}`),
    };
  }

  const debut = page * TAILLE_PAGE;
  const lot = MODULES.slice(debut, debut + TAILLE_PAGE);
  if (lot.length === 0) {
    return { type: 'END', texte: `Fin de la liste. Rappelez ${CODE_COURT}` };
  }

  const lignes = lot.map((unite, i) => `${i + 1}. ${unite.titre}`).join('\n');
  const resteDesModules = debut + TAILLE_PAGE < MODULES.length;
  return {
    type: 'CON',
    texte: tronquer(
      `Choisissez un module\n${lignes}${resteDesModules ? '\n5. Suivant' : ''}`
    ),
  };
}

export { sansAccents };
