import { createContext, useContext, useState, useMemo } from 'react';

const NORMAL_COLORS = {
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
};

const HIGH_CONTRAST_COLORS = {
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
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const value = useMemo(
    () => ({
      isHighContrast,
      toggleContrast: () => setIsHighContrast((v) => !v),
      colors: isHighContrast ? HIGH_CONTRAST_COLORS : NORMAL_COLORS,
    }),
    [isHighContrast]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
  return ctx;
}