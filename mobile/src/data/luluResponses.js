// ⚠️ RÉPONSES PLACEHOLDER — logique par mots-clés simple, en attendant
// un vrai moteur conversationnel (périmètre E3). Ne pas présenter comme
// une IA générative devant le jury sans clarifier son fonctionnement réel.

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
];

export const LULU_FALLBACK =
  'Je ne suis pas encore capable de répondre précisément à ça, mais vous trouverez sûrement une réponse dans nos 10 modules — voulez-vous y jeter un œil ?';

export function trouverReponse(texte) {
  const texteNormalise = texte.toLowerCase();
  for (const regle of LULU_RULES) {
    if (regle.keywords.some((k) => texteNormalise.includes(k))) {
      return regle;
    }
  }
  return null;
}