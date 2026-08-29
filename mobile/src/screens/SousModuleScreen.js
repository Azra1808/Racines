import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PictoIcon from '../components/icons/PictoIcon';
import UiIcon from '../components/icons/UiIcon';
import { MODULES } from '../data/modules';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SousModuleScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { moduleId, sousModuleIndex } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);
  const sousModule = module?.sousModules?.[sousModuleIndex];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, []);

  const styles = getStyles(colors);

  if (!module || !sousModule) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={t('submodule_not_found')} onBack={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={sousModule.titre}
        subtitle={t('submodule_header', { n: sousModuleIndex + 1, titre: module.titre })}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.iconWrap}>
            <PictoIcon name={sousModule.icone} size={34} color={colors.accent} />
          </View>

          <Text style={styles.eyebrow}>{sousModule.description}</Text>

          <View style={styles.excerptBox}>
            <Text style={styles.excerptText}>« {sousModule.extrait} »</Text>
          </View>

          <Text style={styles.count}>5 questions</Text>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Quiz', { moduleId: module.id, mode: 'submodule', sousModuleIndex })}
            accessibilityRole="button"
            accessibilityLabel={t('submodule_answer_a11y', { titre: sousModule.titre })}
          >
            <UiIcon name="quiz" size={18} color={colors.accentText} />
            <Text style={styles.buttonText}>{t('submodule_start', { n: 5 })}</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, paddingBottom: 40 },
    iconWrap: {
      width: 64, height: 64, borderRadius: 20, backgroundColor: colors.surfaceAlt,
      alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    },
    eyebrow: { fontSize: 15, lineHeight: 22, color: colors.textSecondary, marginBottom: 16 },
    excerptBox: {
      backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 6,
      borderLeftWidth: 3, borderLeftColor: colors.accent,
    },
    excerptText: { fontSize: 15, lineHeight: 22, color: colors.textPrimary, fontStyle: 'italic' },
    count: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 24 },
    button: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      backgroundColor: colors.accent, paddingVertical: 15, borderRadius: 12,
    },
    buttonText: { color: colors.accentText, fontSize: 15, fontWeight: '700' },
  });
}
