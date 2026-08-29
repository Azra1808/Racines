import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { lirePreferences, enregistrerPreference } from '../data/db';

// 4 thèmes de couleur, sélectionnables dans Paramètres.
// "contraste" reste par ailleurs le thème d'accessibilité (texte vif sur
// fond noir) déjà utilisé par AccessibilityScreen — le nom et les couleurs
// n'ont pas changé, il est juste maintenant l'un des 4 choix plutôt qu'un
// simple interrupteur on/off.
export const THEMES = {
  nature: {
    id: 'nature',
    label: 'Nature',
    cleTraduction: 'theme_nature',
    swatch: '#1c6b3f',
    colors: {
      background: '#f7f4ee',
      surface: '#ffffff',
      surfaceAlt: '#eef3ea',
      textPrimary: '#1c2733',
      textSecondary: '#4a5a68',
      textMuted: '#7a8a98',
      accent: '#1c6b3f',
      accentSoft: '#c98a2e',
      accentText: '#ffffff',
      border: '#e8e2d5',
      danger: '#c0392b',
      dangerSoft: '#fbeceb',
      gradientStart: '#1c6b3f',
      gradientEnd: '#164f30',
    },
  },
  soleil: {
    id: 'soleil',
    label: 'Soleil',
    cleTraduction: 'theme_soleil',
    swatch: '#c9682e',
    colors: {
      background: '#fbf3ea',
      surface: '#ffffff',
      surfaceAlt: '#f6e6d3',
      textPrimary: '#2a1c12',
      textSecondary: '#6b4a30',
      textMuted: '#9a7c62',
      accent: '#c9682e',
      accentSoft: '#1c6b3f',
      accentText: '#ffffff',
      border: '#ecd9c2',
      danger: '#c0392b',
      dangerSoft: '#fbeceb',
      gradientStart: '#c9682e',
      gradientEnd: '#96481c',
    },
  },
  ocean: {
    id: 'ocean',
    label: 'Océan',
    cleTraduction: 'theme_ocean',
    swatch: '#1a5f7a',
    colors: {
      background: '#eef6f8',
      surface: '#ffffff',
      surfaceAlt: '#dcedf1',
      textPrimary: '#122a33',
      textSecondary: '#3c5e6b',
      textMuted: '#72929c',
      accent: '#1a5f7a',
      accentSoft: '#c98a2e',
      accentText: '#ffffff',
      border: '#d3e6ea',
      danger: '#c0392b',
      dangerSoft: '#fbeceb',
      gradientStart: '#1a5f7a',
      gradientEnd: '#0f4054',
    },
  },
  contraste: {
    id: 'contraste',
    label: 'Contraste élevé',
    cleTraduction: 'theme_contraste',
    swatch: '#ffd60a',
    colors: {
      background: '#000000',
      surface: '#0d0d0d',
      surfaceAlt: '#1a1a00',
      textPrimary: '#ffffff',
      textSecondary: '#ffd60a',
      textMuted: '#e5e5e5',
      accent: '#ffd60a',
      accentSoft: '#ffd60a',
      accentText: '#000000',
      border: '#ffffff',
      danger: '#ff453a',
      dangerSoft: '#3a0000',
      gradientStart: '#000000',
      gradientEnd: '#000000',
    },
  },
};

const THEME_ORDER = ['nature', 'soleil', 'ocean', 'contraste'];

const FONT_SCALE_MIN = 1;
const FONT_SCALE_MAX = 2;
const FONT_SCALE_STEP = 0.15;

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('nature');
  const [fontScale, setFontScale] = useState(1);
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);

  // Relecture des réglages au démarrage. Ils doivent survivre à la fermeture
  // de l'application : un contraste élevé qu'il faut réactiver chaque matin
  // n'aide personne.
  useEffect(() => {
    let annule = false;
    lirePreferences().then((prefs) => {
      if (annule) return;
      if (prefs.themeId) setThemeId(prefs.themeId);
      if (prefs.fontScale) {
        const valeur = Number(prefs.fontScale);
        if (Number.isFinite(valeur)) {
          setFontScale(Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, valeur)));
        }
      }
      if (prefs.isSimplifiedMode) setIsSimplifiedMode(prefs.isSimplifiedMode === 'true');
    });
    return () => { annule = true; };
  }, []);

  const value = useMemo(() => {
    function majFontScale(calcul) {
      setFontScale((v) => {
        const suivant = calcul(v);
        enregistrerPreference('fontScale', suivant);
        return suivant;
      });
    }
    function increaseFontScale() {
      majFontScale((v) => Math.min(FONT_SCALE_MAX, +(v + FONT_SCALE_STEP).toFixed(2)));
    }
    function decreaseFontScale() {
      majFontScale((v) => Math.max(FONT_SCALE_MIN, +(v - FONT_SCALE_STEP).toFixed(2)));
    }
    function resetFontScale() {
      majFontScale(() => 1);
    }
    function rf(size) {
      return Math.round(size * fontScale);
    }

    const isHighContrast = themeId === 'contraste';

    return {
      themeId,
      setTheme: (id) => {
        setThemeId(id);
        enregistrerPreference('themeId', id);
      },
      themes: THEME_ORDER.map((id) => THEMES[id]),
      colors: THEMES[themeId].colors,

      // Conservé pour compatibilité avec AccessibilityScreen.js et le code
      // existant : "contraste élevé" est maintenant un thème parmi 4, mais
      // le bouton/interrupteur historique continue de fonctionner (bascule
      // entre le dernier thème "normal" utilisé et le contraste élevé).
      isHighContrast,
      toggleContrast: () =>
        setThemeId((v) => {
          const suivant = v === 'contraste' ? 'nature' : 'contraste';
          enregistrerPreference('themeId', suivant);
          return suivant;
        }),

      fontScale,
      fontScaleMin: FONT_SCALE_MIN,
      fontScaleMax: FONT_SCALE_MAX,
      increaseFontScale,
      decreaseFontScale,
      resetFontScale,
      rf,
      isSimplifiedMode,
      toggleSimplifiedMode: () =>
        setIsSimplifiedMode((v) => {
          enregistrerPreference('isSimplifiedMode', !v);
          return !v;
        }),
    };
  }, [themeId, fontScale, isSimplifiedMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
  return ctx;
}
