import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ParametresScreen({ navigation }) {
  const { colors, themeId, setTheme, themes, rf } = useTheme();
  const { langueId, setLangue, langues, t } = useLanguage();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('settings_title')}
        subtitle={t('settings_subtitle')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { fontSize: rf(16) }]}>{t('settings_theme_title')}</Text>
          <Text style={[styles.cardDescription, { fontSize: rf(14) }]}>{t('settings_theme_subtitle')}</Text>

          <View style={styles.themeGrid}>
            {themes.map((theme) => {
              const selected = theme.id === themeId;
              return (
                <Pressable
                  key={theme.id}
                  style={[
                    styles.themeCard,
                    { borderColor: selected ? theme.swatch : colors.border, borderWidth: selected ? 3 : 1 },
                  ]}
                  onPress={() => setTheme(theme.id)}
                >
                  <View style={[styles.swatch, { backgroundColor: theme.swatch }]} />
                  <Text style={[styles.themeLabel, { color: colors.textPrimary, fontSize: rf(13) }]}>
                    {theme.label}
                  </Text>
                  {selected && <Text style={styles.checkMark}>✓</Text>}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { fontSize: rf(16) }]}>{t('settings_language_title')}</Text>
          <Text style={[styles.cardDescription, { fontSize: rf(14) }]}>{t('settings_language_subtitle')}</Text>

          <View style={styles.languageList}>
            {langues.map((langue) => {
              const selected = langue.id === langueId;
              return (
                <Pressable
                  key={langue.id}
                  style={[
                    styles.languageRow,
                    { backgroundColor: selected ? colors.accent : colors.surfaceAlt },
                  ]}
                  onPress={() => setLangue(langue.id)}
                >
                  <Text style={styles.languageFlag}>{langue.drapeau}</Text>
                  <Text
                    style={[
                      styles.languageLabel,
                      { color: selected ? colors.accentText : colors.textPrimary, fontSize: rf(15) },
                    ]}
                  >
                    {langue.label}
                  </Text>
                  {selected && (
                    <Text style={[styles.languageCheck, { color: colors.accentText }]}>✓</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable style={styles.linkRow} onPress={() => navigation.navigate('Accessibility')}>
          <Text style={[styles.linkText, { color: colors.accent, fontSize: rf(15) }]}>
            {t('settings_accessibility_link')}
          </Text>
        </Pressable>

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
    themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    themeCard: {
      width: '47%', borderRadius: 14, padding: 14, alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
    },
    swatch: { width: 36, height: 36, borderRadius: 18, marginBottom: 8 },
    themeLabel: { fontWeight: '700' },
    checkMark: { position: 'absolute', top: 8, right: 10, fontWeight: '900', color: colors.accent },
    languageList: { gap: 10 },
    languageRow: {
      flexDirection: 'row', alignItems: 'center', borderRadius: 12,
      paddingVertical: 12, paddingHorizontal: 14, gap: 10,
    },
    languageFlag: { fontSize: 18 },
    languageLabel: { fontWeight: '700', flex: 1 },
    languageCheck: { fontWeight: '900' },
    linkRow: { alignItems: 'center', paddingVertical: 10 },
    linkText: { fontWeight: '700' },
  });
}
