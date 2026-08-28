import { createContext, useContext, useState, useMemo } from 'react';

// ⚠️ IMPORTANT — à lire avant d'enregistrer la vidéo de démonstration :
// Le français et l'anglais ci-dessous sont fiables. L'ewondo et le bassa
// sont une TRADUCTION DE MEILLEUR EFFORT, non validée par un locuteur natif
// (exactement le risque que le plan d'action identifie lui-même : "Aucune
// traduction automatique diffusée" / validation par locuteur natif requise).
// Pour une démo filmée devant un jury où siègent potentiellement des
// personnes qui parlent ces langues, il est fortement recommandé de faire
// relire ces chaînes par un locuteur natif (Alexia a des contacts identifiés
// pour T-018) avant le tournage. Elles sont ici pour que le SÉLECTEUR DE
// LANGUE soit fonctionnel à l'écran — le contenu des modules (audio, texte
// enrichi) reste uniquement en français pour le MVP.

export const LANGUES = [
  { id: 'fr', label: 'Français', drapeau: '🇫🇷' },
  { id: 'en', label: 'English', drapeau: '🇬🇧' },
  { id: 'ewo', label: 'Ewondo', drapeau: '🌿' },
  { id: 'bas', label: 'Bassa', drapeau: '🌿' },
];

const TRADUCTIONS = {
  fr: {
    home_eyebrow: 'Programme de parentalité positive',
    home_subtitle: 'Des conseils simples et fiables pour accompagner votre enfant, à chaque étape de sa vie.',
    home_feature_offline: 'Hors connexion',
    home_feature_audio: 'Lecture audio',
    home_feature_modules: '10 modules',
    home_btn_discover: 'Découvrir les modules',
    home_btn_lulu: 'Parler à Lulu',
    home_footer: 'Contenus issus du guide officiel UNICEF Cameroun',
    nav_settings: 'Paramètres',
    nav_accessibility: 'Accessibilité',
    nav_back: 'Retour',
    settings_title: 'Paramètres',
    settings_subtitle: 'Personnalisez l\'apparence et la langue',
    settings_theme_title: 'Thème',
    settings_theme_subtitle: 'Choisissez les couleurs de l\'application',
    settings_language_title: 'Langue',
    settings_language_subtitle: 'Choisissez la langue de l\'interface',
    settings_accessibility_link: 'Réglages d\'accessibilité →',
    lulu_greeting: 'Bonjour, je suis Lulu 🌱 Posez-moi une question sur votre enfant, je vous orienterai vers le bon module.',
    lulu_placeholder: 'Écrivez votre question...',
    lulu_source: 'Source',
    common_open_module: 'Ouvrir le module',
    common_next: 'Suivant',
    common_listen: 'Écouter',
  },
  en: {
    home_eyebrow: 'Positive parenting programme',
    home_subtitle: 'Simple, reliable guidance to support your child at every stage of life.',
    home_feature_offline: 'Offline',
    home_feature_audio: 'Audio playback',
    home_feature_modules: '10 modules',
    home_btn_discover: 'Explore the modules',
    home_btn_lulu: 'Talk to Lulu',
    home_footer: 'Content from the official UNICEF Cameroon guide',
    nav_settings: 'Settings',
    nav_accessibility: 'Accessibility',
    nav_back: 'Back',
    settings_title: 'Settings',
    settings_subtitle: 'Customise the look and the language',
    settings_theme_title: 'Theme',
    settings_theme_subtitle: 'Choose the app colours',
    settings_language_title: 'Language',
    settings_language_subtitle: 'Choose the interface language',
    settings_accessibility_link: 'Accessibility settings →',
    lulu_greeting: 'Hello, I\'m Lulu 🌱 Ask me anything about your child and I\'ll point you to the right module.',
    lulu_placeholder: 'Type your question...',
    lulu_source: 'Source',
    common_open_module: 'Open module',
    common_next: 'Next',
    common_listen: 'Listen',
  },
  // Ewondo — traduction de meilleur effort, NON VALIDÉE (voir avertissement
  // en haut de fichier). À faire relire avant diffusion.
  ewo: {
    home_eyebrow: 'Ayôñ ya ndzôm mvamvam',
    home_subtitle: 'Melebe ya mvamvam asu na wo ô yem timba mon wo, asu ayale a fo\'o ase.',
    home_feature_offline: 'Si internet te',
    home_feature_audio: 'Wôk ki elañ',
    home_feature_modules: 'Bikalate 10',
    home_btn_discover: 'Yen bikalate',
    home_btn_lulu: 'Kobô na Lulu',
    home_footer: 'Melebe ma so UNICEF Cameroun',
    nav_settings: 'Ngamba',
    nav_accessibility: 'Ayôñ asu bôt bese',
    nav_back: 'Kal si',
    settings_title: 'Ngamba',
    settings_subtitle: 'Kelege mintaña ba ayôñ',
    settings_theme_title: 'Mintaña',
    settings_theme_subtitle: 'Pô mintaña ma app',
    settings_language_title: 'Ayôñ',
    settings_language_subtitle: 'Pô ayôñ a app',
    settings_accessibility_link: 'Ngamba asu bôt bese →',
    lulu_greeting: 'Mbolô, ma ne Lulu 🌱 Sili ma jam d\'ayoñ mon wo, ma ye lem wo bikalate.',
    lulu_placeholder: 'Tila jam wo...',
    lulu_source: 'Ayale',
    common_open_module: 'Fulu bikalate',
    common_next: 'Ake',
    common_listen: 'Wôk',
  },
  // Bassa — traduction de meilleur effort, NON VALIDÉE (voir avertissement
  // en haut de fichier). À faire relire avant diffusion.
  bas: {
    home_eyebrow: 'Manyaka ma bôlô bon',
    home_subtitle: 'Mahoñol ma nlem asu i sébél mon wo i ngéda yosôna.',
    home_feature_offline: 'Ndi internet te',
    home_feature_audio: 'Séŋgi i wôk',
    home_feature_modules: 'Bikalati 10',
    home_btn_discover: 'Yen bikalati',
    home_btn_lulu: 'Kobol ni Lulu',
    home_footer: 'Manyaka ma UNICEF Cameroun',
    nav_settings: 'Ngiimba',
    nav_accessibility: 'Manyaka asu bôt bese',
    nav_back: 'Kal si',
    settings_title: 'Ngiimba',
    settings_subtitle: 'Kelege mintaña i ngiimba',
    settings_theme_title: 'Mintaña',
    settings_theme_subtitle: 'Pô mintaña ma app',
    settings_language_title: 'Hilongi',
    settings_language_subtitle: 'Pô hilongi i app',
    settings_accessibility_link: 'Ngiimba asu bôt bese →',
    lulu_greeting: 'Mbôlô, mba nde Lulu 🌱 Sili mba jam ni mon wo, mba we lem wo bikalati.',
    lulu_placeholder: 'Tila jam wo...',
    lulu_source: 'Nlombô',
    common_open_module: 'Fulu bikalati',
    common_next: 'Ke',
    common_listen: 'Séŋgi',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [langueId, setLangueId] = useState('fr');

  const value = useMemo(() => {
    const dict = TRADUCTIONS[langueId] || TRADUCTIONS.fr;
    function t(cle) {
      return dict[cle] ?? TRADUCTIONS.fr[cle] ?? cle;
    }
    return {
      langueId,
      setLangue: setLangueId,
      langues: LANGUES,
      t,
    };
  }, [langueId]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage doit être utilisé à l\'intérieur de LanguageProvider');
  return ctx;
}
