import { createContext, useContext, useState, useMemo } from 'react';

// 4 thèmes de couleur, sélectionnables dans Paramètres.
// "contraste" reste par ailleurs le thème d'accessibilité (texte vif sur
// fond noir) déjà utilisé par AccessibilityScreen — le nom et les couleurs
// n'ont pas changé, il est juste maintenant l'un des 4 choix plutôt qu'un
// simple interrupteur on/off.
export const THEMES = {
  nature: {
    id: 'nature',
    label: 'Nature',
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

  const value = useMemo(() => {
    function increaseFontScale() {
      setFontScale((v) => Math.min(FONT_SCALE_MAX, +(v + FONT_SCALE_STEP).toFixed(2)));
    }
    function decreaseFontScale() {
      setFontScale((v) => Math.max(FONT_SCALE_MIN, +(v - FONT_SCALE_STEP).toFixed(2)));
    }
    function resetFontScale() {
      setFontScale(1);
    }
    function rf(size) {
      return Math.round(size * fontScale);
    }

    const isHighContrast = themeId === 'contraste';

    return {
      themeId,
      setTheme: setThemeId,
      themes: THEME_ORDER.map((id) => THEMES[id]),
      colors: THEMES[themeId].colors,

      // Conservé pour compatibilité avec AccessibilityScreen.js et le code
      // existant : "contraste élevé" est maintenant un thème parmi 4, mais
      // le bouton/interrupteur historique continue de fonctionner (bascule
      // entre le dernier thème "normal" utilisé et le contraste élevé).
      isHighContrast,
      toggleContrast: () => setThemeId((v) => (v === 'contraste' ? 'nature' : 'contraste')),

      fontScale,
      fontScaleMin: FONT_SCALE_MIN,
      fontScaleMax: FONT_SCALE_MAX,
      increaseFontScale,
      decreaseFontScale,
      resetFontScale,
      rf,
      isSimplifiedMode,
      toggleSimplifiedMode: () => setIsSimplifiedMode((v) => !v),
    };
  }, [themeId, fontScale, isSimplifiedMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
  return ctx;
}
