import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const FEATURES = [
    { icon: '📶', label: t('home_feature_offline') },
    { icon: '🔊', label: t('home_feature_audio') },
    { icon: '📚', label: t('home_feature_modules') },
  ];
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(24)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const featuresFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(badgeAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(titleFade, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(titleAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
      ]),
      Animated.timing(featuresFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(buttonFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(buttonScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const styles = getStyles(colors);

  return (
    <View style={styles.root}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradientTop} />
      {colors.background !== '#000000' && (
        <>
          <View style={styles.circleDecor1} />
          <View style={styles.circleDecor2} />
        </>
      )}

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.navigate('Parametres')}
            style={styles.contrastButton}
            accessibilityLabel={t('nav_settings')}
          >
            <Text style={styles.contrastIcon}>⚙️</Text>
          </Pressable>
        </View>

        <View style={styles.topSection}>
          <Animated.View style={[styles.badge, { transform: [{ scale: badgeAnim }] }]}>
            <Text style={styles.badgeIcon}>🌱</Text>
          </Animated.View>

          <Animated.View style={{ opacity: titleFade, transform: [{ translateY: titleAnim }] }}>
            <Text style={styles.eyebrow}>{t('home_eyebrow')}</Text>
            <Text style={styles.title}>RACINES</Text>
            <Text style={styles.subtitle}>{t('home_subtitle')}</Text>
          </Animated.View>
        </View>

        <View style={styles.sheet}>
          <Animated.View style={[styles.featuresRow, { opacity: featuresFade }]}>
            {FEATURES.map((f) => (
              <View key={f.label} style={styles.featurePill}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View style={{ opacity: buttonFade, transform: [{ scale: buttonScale }] }}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={() => navigation.navigate('Catalog')}
            >
              <Text style={styles.buttonText}>{t('home_btn_discover')}</Text>
              <Text style={styles.buttonText}>→</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
              onPress={() => navigation.navigate('Lulu')}
            >
              <Text style={styles.secondaryButtonText}>💬 {t('home_btn_lulu')}</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.footer}>{t('home_footer')}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    gradientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: '58%' },
    circleDecor1: {
      position: 'absolute', top: -60, right: -60,
      width: width * 0.6, height: width * 0.6, borderRadius: width * 0.3,
      backgroundColor: 'rgba(255,255,255,0.06)',
    },
    circleDecor2: {
      position: 'absolute', top: 100, left: -80,
      width: width * 0.45, height: width * 0.45, borderRadius: width * 0.225,
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    safe: { flex: 1, justifyContent: 'space-between' },
    topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 4 },
    contrastButton: {
      width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center', justifyContent: 'center',
    },
    contrastIcon: { fontSize: 18 },
    topSection: { paddingHorizontal: 28, paddingTop: 4, alignItems: 'flex-start' },
    badge: {
      width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.14)',
      alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    },
    badgeIcon: { fontSize: 30 },
    eyebrow: {
      fontSize: 13, fontWeight: '600', color: colors.textSecondary,
      textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6,
    },
    title: { fontSize: 40, fontWeight: '900', color: '#fff', letterSpacing: 0.5, marginBottom: 14 },
    subtitle: { fontSize: 16, lineHeight: 24, color: 'rgba(255,255,255,0.9)', maxWidth: '92%' },
    sheet: {
      backgroundColor: colors.background, borderTopLeftRadius: 28, borderTopRightRadius: 28,
      paddingHorizontal: 24, paddingTop: 28, paddingBottom: 8, marginTop: 24,
      borderTopWidth: colors.background === '#000000' ? 2 : 0,
      borderColor: colors.border,
    },
    featuresRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    featurePill: {
      flex: 1, alignItems: 'center', backgroundColor: colors.surface,
      borderRadius: 14, paddingVertical: 14, marginHorizontal: 4,
      borderWidth: colors.background === '#000000' ? 1 : 0, borderColor: colors.border,
    },
    featureIcon: { fontSize: 20, marginBottom: 6 },
    featureLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center' },
    button: {
      backgroundColor: colors.accent, paddingVertical: 17, borderRadius: 14,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    buttonPressed: { opacity: 0.85 },
    buttonText: { color: colors.accentText, fontSize: 16, fontWeight: '700' },
    secondaryButton: {
      borderWidth: 2, borderColor: colors.accent, paddingVertical: 15,
      borderRadius: 14, alignItems: 'center', marginTop: 10,
    },
    secondaryButtonText: { color: colors.accent, fontSize: 15, fontWeight: '700' },
    footer: { textAlign: 'center', fontSize: 11, color: colors.textMuted, marginTop: 16, marginBottom: 4 },
  });
}