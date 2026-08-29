// Lulu est un routeur documentaire local, pas un diagnostic médical ni une IA générative.
// Les réponses orientent uniquement vers les modules validés du corpus embarqué.

// Normalise avant toute comparaison : minuscules, accents retirés,
// apostrophes ramenées à un espace. Sans cela, « me frappe » ne correspond
// pas à « frappé », et une alerte réelle passe à travers — défaut constaté
// le 29/08 en recette.
function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Garde-fou 1 — urgence médicale ou vitale.
// Motifs volontairement précis : on cherche la situation, pas un mot isolé.
const MOTIFS_URGENCE_MEDICALE = [
  /\bne respire (plus|pas)\b/,
  /\brespire mal\b/,
  /\bperdu connaissance\b/,
  /\binconscient/,
  /\bsaigne (beaucoup|abondamment)\b/,
  /\bconvulsion/,
  /\bne bouge plus\b/,
];

// Garde-fou 2 — protection de l'enfant et détresse du parent.
// On utilise des expressions et non des mots isolés : « frapper » seul
// apparaît dans une question légitime sur la discipline positive, qui doit
// continuer d'être orientée vers son module.
const MOTIFS_ALERTE_PROTECTION = [
  // Violences
  /\bme (bat|frappe|tape|cogne)\b/,
  /\bnous (bat|frappe)\b/,
  /\b(bat|frappe|tape) (mes|les|mon|ma|son|sa) enfants?\b/,
  /\bje (bats|frappe)\b/,
  /\bplus fort que je (le )?voudrais\b/,
  /\bbattues?\b/, /\bbattus?\b/,
  /\bmaltrait/,
  /\bbrutalise/,
  // Violences sexuelles
  /\bviole?e?s?\b/,
  /\babus\b/,
  /\battouchement/,
  /\ba ete touchees?\b/, /\ba ete touches?\b/,
  // Détresse du parent
  /\bidees? noires?\b/,
  /\bfaire du mal\b/,
  /\bsuicid/,
  /\bme tuer\b/,
  /\bje craque\b/,
  /\bme sens vide\b/,
  /\bplus la force\b/,
  /\bpersonne ne m aide\b/,
  // Mariage précoce, travail des enfants, privation
  /\bmarier (ma|sa|une) fille\b/,
  /\bmariage (force|precoce)\b/,
  /\btravaille au lieu d aller\b/,
  /\bplus d argent pour nourrir\b/,
  /\binterdit\b[\s\S]*\bhopital\b/,
];

const REPONSE_URGENCE_MEDICALE = {
  type: 'urgence',
  reponse:
    "La sécurité de l’enfant passe avant l’application. Si l’enfant ne respire pas, saigne beaucoup, convulse ou a perdu connaissance, rendez-vous immédiatement au centre de santé ou au service d’urgence le plus proche. Lulu ne peut pas gérer une urgence.",
};

const REPONSE_ALERTE_PROTECTION = {
  type: 'urgence',
  reponse:
    "Ce que vous décrivez est important, et vous n’êtes pas seul(e). Lulu ne peut pas vous accompagner sur cette situation, mais une personne le peut : parlez-en dès que possible à votre facilitateur communautaire, au centre de santé le plus proche ou à un service d’aide à l’enfance. Vous avez bien fait d’en parler.",
};

export const LULU_RULES = [
  {
    keywords: ['handicap', 'droit', 'discrimination'],
    moduleId: 'u01-voir-enfant-autrement',
    reponse: 'Chaque enfant mérite le même amour et les mêmes droits, quelles que soient ses capacités. Voici un module qui explique comment mieux l\'accompagner :',
  },
  {
    keywords: ['communauté', 'village', 'voisin', 'famille élargie'],
    moduleId: 'u02-proteger-affaire-de-tous',
    reponse: 'La protection d\'un enfant, c\'est aussi l\'affaire de la famille et de la communauté. Ce module en parle :',
  },
  {
    keywords: ['cerveau', 'développement', 'crier', 'cris', 'violence'],
    moduleId: 'u03-cerveau-grandit-amour',
    reponse: 'L\'amour et l\'attention aident vraiment le cerveau de votre enfant à bien grandir. Ce module explique pourquoi :',
  },
  {
    keywords: ['allaitement', 'vaccin', 'grossesse', 'bébé', 'nouveau-né', 'naissance'],
    moduleId: 'u04-1000-premiers-jours',
    reponse: 'Les premiers jours de vie sont décisifs pour la santé de votre enfant. Ce module vous guide :',
  },
  {
    keywords: ['parler', 'communiquer', 'écouter', 'écoute', 'empathie'],
    moduleId: 'u05-parler-a-son-enfant',
    reponse: 'Bien communiquer avec son enfant, ça s\'apprend. Voici un module utile :',
  },
  {
    keywords: ['discipline', 'punir', 'punition', 'sanction', 'gronder'],
    moduleId: 'u06-discipliner-sans-punir',
    reponse: 'La discipline positive fonctionne mieux que la punition. Ce module explique comment faire :',
  },
  {
    keywords: ['mariage', 'exploitation', 'danger', 'risque'],
    moduleId: 'u07-pratiques-nefastes',
    reponse: 'Certaines pratiques traditionnelles nuisent gravement aux enfants. Ce module vous aide à les reconnaître :',
  },
  {
    keywords: ['adolescent', 'adolescence', 'ado'],
    moduleId: 'u08-accompagner-adolescent',
    reponse: 'L\'adolescence est une période délicate à accompagner. Ce module peut vous aider :',
  },
  {
    keywords: ['budget', 'depense', 'depenses', 'economiser', 'scolarite', 'frais', 'revenu'],
    moduleId: 'u09-planifier-budget-enfant',
    reponse: 'Prévoir les dépenses de ses enfants, cela s\'organise en famille. Ce module vous guide :',
  },
  {
    keywords: ['fatigue', 'fatiguee', 'stress', 'repos', 'souffler', 'epuise', 'epuisee', 'prendre soin de moi'],
    moduleId: 'u10-prendre-soin-de-soi',
    reponse: 'Prendre soin de vous, c\'est aussi prendre soin de votre enfant. Ce module en parle :',
  },
];

export const LULU_FALLBACK =
  "Je n’ai pas de réponse fiable à cette question dans les modules validés. Consultez le catalogue ou parlez-en à un facilitateur communautaire ou un professionnel compétent.";

export function trouverReponse(texte) {
  const texteNormalise = normaliser(texte);

  // L'ordre est un choix de sécurité, pas de commodité : la protection de
  // l'enfant est évaluée avant toute règle de contenu, et une urgence vitale
  // avant tout le reste.
  if (MOTIFS_URGENCE_MEDICALE.some((motif) => motif.test(texteNormalise))) {
    return REPONSE_URGENCE_MEDICALE;
  }
  if (MOTIFS_ALERTE_PROTECTION.some((motif) => motif.test(texteNormalise))) {
    return REPONSE_ALERTE_PROTECTION;
  }

  for (const regle of LULU_RULES) {
    if (regle.keywords.some((k) => texteNormalise.includes(normaliser(k)))) {
      return regle;
    }
  }
  return null;
}
