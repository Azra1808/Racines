import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { MODULES } from '../data/modules';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = Math.round(height * 0.5);

// --- Icônes vectorielles minimalistes (remplacent les emojis) ---

function OfflineIcon({ color, size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 17a4 4 0 0 1 .4-7.98 5.5 5.5 0 0 1 10.6-1.4A4.5 4.5 0 0 1 17.5 17H6Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path d="M9 14.5l6-5M9 9.5l6 5" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

function AudioIcon({ color, size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 10v4h3.5L12 17.5v-11L7.5 10H4Z" fill={color} />
      <Path d="M16 9.5a4 4 0 0 1 0 5" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
      <Path d="M18.3 7.3a7.5 7.5 0 0 1 0 9.4" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

function ModulesIcon({ color, size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.5c-1.4-1.1-3.4-1.5-5.5-1.2v11.6c2.1-.3 4.1.1 5.5 1.2V6.5Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M12 6.5c1.4-1.1 3.4-1.5 5.5-1.2v11.6c-2.1-.3-4.1.1-5.5 1.2V6.5Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ArrowIcon({ color, size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChatIcon({ color, size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5.5h16v10H9.5L5.5 19v-3.5H4v-10Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function GearIcon({ color, size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.6} />
      <Path
        d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7 6.3 6.3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Tracé de racines décoratif derrière le héros — clin d'œil au splashscreen
function RootTracery({ color }) {
  return (
    <Svg
      width={width}
      height={HERO_HEIGHT}
      viewBox={`0 0 ${width} ${HERO_HEIGHT}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Path
        d={`M${width * 0.5},${HERO_HEIGHT} C${width * 0.35},${HERO_HEIGHT * 0.7} ${width * 0.2},${HERO_HEIGHT * 0.6} ${width * 0.08},${HERO_HEIGHT * 0.32}`}
        stroke={color}
        strokeWidth={1.2}
        fill="none"
      />
      <Path
        d={`M${width * 0.5},${HERO_HEIGHT} C${width * 0.4},${HERO_HEIGHT * 0.75} ${width * 0.32},${HERO_HEIGHT * 0.55} ${width * 0.3},${HERO_HEIGHT * 0.2}`}
        stroke={color}
        strokeWidth={1.2}
        fill="none"
      />
      <Path
        d={`M${width * 0.5},${HERO_HEIGHT} C${width * 0.65},${HERO_HEIGHT * 0.7} ${width * 0.8},${HERO_HEIGHT * 0.6} ${width * 0.92},${HERO_HEIGHT * 0.32}`}
        stroke={color}
        strokeWidth={1.2}
        fill="none"
      />
      <Path
        d={`M${width * 0.5},${HERO_HEIGHT} C${width * 0.6},${HERO_HEIGHT * 0.75} ${width * 0.68},${HERO_HEIGHT * 0.55} ${width * 0.7},${HERO_HEIGHT * 0.2}`}
        stroke={color}
        strokeWidth={1.2}
        fill="none"
      />
    </Svg>
  );
}

const FEATURES = [
  { Icon: OfflineIcon, label: 'Hors connexion' },
  { Icon: AudioIcon, label: 'Lecture audio' },
  { Icon: ModulesIcon, label: `${MODULES.length} modules` },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
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

  const isHighContrast = colors.background === '#000000';
  const styles = getStyles(colors);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: HERO_HEIGHT }}
      />
      {!isHighContrast && <RootTracery color="rgba(201,138,46,0.22)" />}

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.navigate('Accessibility')}
            style={styles.contrastButton}
            accessibilityLabel="Ouvrir les réglages d'accessibilité"
          >
            <GearIcon color="#fff" size={17} />
          </Pressable>
        </View>

        <View style={styles.topSection}>
          <Animated.View style={[styles.badge, { transform: [{ scale: badgeAnim }] }]}>
            <View style={styles.badgeInner}>
              <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 21c0-5 3-7 6-9-3 .5-6 2-6 6 0-4-3-5.5-6-6 3 2 6 4 6 9Z"
                  fill="#c98a2e"
                />
              </Svg>
            </View>
          </Animated.View>

          <Animated.View style={{ opacity: titleFade, transform: [{ translateY: titleAnim }] }}>
            <Text style={styles.eyebrow}>Programme de parentalité positive</Text>
            <View style={styles.eyebrowRule} />
            <Text style={styles.title}>RACINES</Text>
            <Text style={styles.subtitle}>
              Des conseils simples et fiables pour accompagner votre enfant,
              à chaque étape de sa vie.
            </Text>
          </Animated.View>
        </View>

        <View style={styles.sheetWrap}>
          <Svg width={width} height={36} viewBox={`0 0 ${width} 36`} style={styles.sheetWave}>
            <Path
              d={`M0,36 Q${width / 2},-6 ${width},36 L${width},36 L0,36 Z`}
              fill={colors.background}
            />
          </Svg>

          <View style={styles.sheet}>
            <Animated.View style={[styles.featuresRow, { opacity: featuresFade }]}>
              {FEATURES.map(({ Icon, label }) => (
                <View key={label} style={styles.featurePill}>
                  <View style={styles.featureIconWrap}>
                    <Icon color={colors.accentSoft} size={18} />
                  </View>
                  <Text style={styles.featureLabel}>{label}</Text>
                </View>
              ))}
            </Animated.View>

            <Animated.View style={{ opacity: buttonFade, transform: [{ scale: buttonScale }] }}>
              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={() => navigation.navigate('Catalog')}
              >
                <Text style={styles.buttonText}>Découvrir les modules</Text>
                <ArrowIcon color={isHighContrast ? colors.accentText : '#164f30'} size={16} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={() => navigation.navigate('Lulu')}
              >
                <ChatIcon color={colors.accent} size={16} />
                <Text style={styles.secondaryButtonText}>Parler à Lulu</Text>
              </Pressable>
            </Animated.View>

            <Text style={styles.footer}>Contenus issus du guide officiel UNICEF Cameroun</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function getStyles(colors) {
  const isHighContrast = colors.background === '#000000';
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    safe: { flex: 1, justifyContent: 'space-between' },
    topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 4 },
    contrastButton: {
      width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center', justifyContent: 'center',
    },
    topSection: { paddingHorizontal: 28, paddingTop: 8, alignItems: 'flex-start' },
    badge: {
      width: 62, height: 62, borderRadius: 31,
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1.5, borderColor: 'rgba(201,138,46,0.55)',
      alignItems: 'center', justifyContent: 'center', marginBottom: 22,
    },
    badgeInner: { alignItems: 'center', justifyContent: 'center' },
    eyebrow: {
      fontSize: 12.5, fontWeight: '700', color: '#e7c988',
      textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 8,
    },
    eyebrowRule: { width: 30, height: 2, backgroundColor: '#c98a2e', marginBottom: 14, borderRadius: 1 },
    title: { fontSize: 44, fontWeight: '900', color: '#fff', letterSpacing: 1, marginBottom: 14 },
    subtitle: { fontSize: 16, lineHeight: 24, color: 'rgba(255,255,255,0.88)', maxWidth: '90%' },
    sheetWrap: { marginTop: 18 },
    sheetWave: { marginBottom: -1 },
    sheet: {
      backgroundColor: colors.background,
      paddingHorizontal: 24, paddingTop: 14, paddingBottom: 8,
      borderTopWidth: isHighContrast ? 2 : 0,
      borderColor: colors.border,
    },
    featuresRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26 },
    featurePill: {
      flex: 1, alignItems: 'center', backgroundColor: colors.surface,
      borderRadius: 16, paddingVertical: 16, marginHorizontal: 4,
      borderWidth: 1, borderColor: isHighContrast ? colors.border : '#eee3d0',
    },
    featureIconWrap: {
      width: 34, height: 34, borderRadius: 17,
      backgroundColor: isHighContrast ? 'transparent' : '#fbf3e4',
      alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    },
    featureLabel: { fontSize: 11, fontWeight: '600', color: colors.textSecondary, textAlign: 'center' },
    button: {
      backgroundColor: colors.accentSoft, paddingVertical: 17, borderRadius: 999,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    buttonPressed: { opacity: 0.85 },
    buttonText: {
      color: isHighContrast ? colors.accentText : '#164f30',
      fontSize: 16, fontWeight: '700',
    },
    secondaryButton: {
      borderWidth: 1.5, borderColor: colors.accent, paddingVertical: 15,
      borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      gap: 8, marginTop: 12,
    },
    secondaryButtonText: { color: colors.accent, fontSize: 15, fontWeight: '700' },
    footer: { textAlign: 'center', fontSize: 11, color: colors.textMuted, marginTop: 18, marginBottom: 4 },
  });
}
