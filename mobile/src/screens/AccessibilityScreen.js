import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function AccessibilityScreen({ navigation }) {
  const {
    colors, isHighContrast, toggleContrast,
    fontScale, fontScaleMin, fontScaleMax,
    increaseFontScale, decreaseFontScale, resetFontScale, rf,isSimplifiedMode, toggleSimplifiedMode,
  } = useTheme();
  const { t } = useLanguage();

  const styles = getStyles(colors);
  const percentage = Math.round(fontScale * 100);

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('access_title')} subtitle={t('access_subtitle')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { fontSize: rf(16) }]}>{t('access_contrast')}</Text>
          <Text style={[styles.cardDescription, { fontSize: rf(14) }]}>
            {t('access_contrast_desc')}
          </Text>
          <Pressable
            style={[styles.toggleRow, styles.toggleRowIconed, { backgroundColor: isHighContrast ? colors.accent : colors.surfaceAlt }]}
            onPress={toggleContrast}
            accessibilityRole="switch"
            accessibilityState={{ checked: isHighContrast }}
            accessibilityLabel={t('access_contrast')}
          >
            <UiIcon name={isHighContrast ? 'sun' : 'moon'} size={18} color={isHighContrast ? colors.accentText : colors.textPrimary} />
            <Text style={[styles.toggleText, { color: isHighContrast ? colors.accentText : colors.textPrimary, fontSize: rf(15) }]}>
              {isHighContrast ? t('access_contrast_on') : t('access_contrast_off')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { fontSize: rf(16) }]}>{t('access_fontsize')}</Text>
          <Text style={[styles.cardDescription, { fontSize: rf(14) }]}>
            {t('access_fontsize_desc')}
          </Text>

          <View style={styles.previewBox}>
            <Text style={[styles.previewText, { fontSize: rf(16) }]}>
              {t('access_preview')}
            </Text>
          </View>

          <View style={styles.stepperRow}>
            <Pressable
              style={[styles.stepperButton, fontScale <= fontScaleMin && styles.stepperButtonDisabled]}
              onPress={decreaseFontScale}
              disabled={fontScale <= fontScaleMin}
              accessibilityRole="button"
              accessibilityLabel={t('access_font_smaller')}
              accessibilityState={{ disabled: fontScale <= fontScaleMin }}
            >
              <Text style={styles.stepperButtonText}>A−</Text>
            </Pressable>

            <View style={styles.percentageWrap}>
              <Text style={[styles.percentageText, { fontSize: rf(15) }]}>{percentage}%</Text>
            </View>

            <Pressable
              style={[styles.stepperButton, fontScale >= fontScaleMax && styles.stepperButtonDisabled]}
              onPress={increaseFontScale}
              disabled={fontScale >= fontScaleMax}
              accessibilityRole="button"
              accessibilityLabel={t('access_font_bigger')}
              accessibilityState={{ disabled: fontScale >= fontScaleMax }}
            >
              <Text style={styles.stepperButtonText}>A+</Text>
            </Pressable>
          </View>

          {fontScale !== 1 && (
            <Pressable
              style={styles.resetButton}
              onPress={resetFontScale}
              accessibilityRole="button"
              accessibilityLabel={t('access_font_reset_a11y')}
            >
              <Text style={[styles.resetButtonText, { fontSize: rf(13) }]}>{t('access_font_reset')}</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { fontSize: rf(16) }]}>{t('access_simplified')}</Text>
          <Text style={[styles.cardDescription, { fontSize: rf(14) }]}>
            Affiche les modules en phrases courtes avec de grands pictogrammes,
            plus facile à suivre.
          </Text>
          <Pressable
            style={[styles.toggleRow, styles.toggleRowIconed, { backgroundColor: isSimplifiedMode ? colors.accent : colors.surfaceAlt }]}
            onPress={toggleSimplifiedMode}
            accessibilityRole="switch"
            accessibilityState={{ checked: isSimplifiedMode }}
            accessibilityLabel={t('access_simplified')}
          >
            <UiIcon name={isSimplifiedMode ? 'checkFilled' : 'image'} size={18} color={isSimplifiedMode ? colors.accentText : colors.textPrimary} />
            <Text style={[styles.toggleText, { color: isSimplifiedMode ? colors.accentText : colors.textPrimary, fontSize: rf(15) }]}>
              {isSimplifiedMode ? t('access_simplified_on') : t('access_simplified_off')}
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, gap: 16 },
    card: {
      backgroundColor: colors.surface, borderRadius: 16, padding: 18,
      borderWidth: colors.background === '#000000' ? 1 : 0, borderColor: colors.border,
    },
    cardTitle: { fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
    cardDescription: { color: colors.textSecondary, lineHeight: 20, marginBottom: 16 },
    toggleRow: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    toggleRowIconed: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
    toggleText: { fontWeight: '700' },
    previewBox: {
      backgroundColor: colors.surfaceAlt, borderRadius: 12, padding: 14, marginBottom: 16,
    },
    previewText: { color: colors.textPrimary, lineHeight: 24 },
    stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
    stepperButton: {
      width: 52, height: 52, borderRadius: 26, backgroundColor: colors.accent,
      alignItems: 'center', justifyContent: 'center',
    },
    stepperButtonDisabled: { opacity: 0.35 },
    stepperButtonText: { color: colors.accentText, fontSize: 17, fontWeight: '800' },
    percentageWrap: { minWidth: 60, alignItems: 'center' },
    percentageText: { color: colors.textPrimary, fontWeight: '700' },
    resetButton: { alignItems: 'center', marginTop: 14 },
    resetButtonText: { color: colors.accent, fontWeight: '600', textDecorationLine: 'underline' },
  });
}