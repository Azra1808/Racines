import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FEATURES = [
  { icon: '📶', label: 'Hors connexion' },
  { icon: '🔊', label: 'Lecture audio' },
  { icon: '📚', label: '8 modules' },
];

export default function HomeScreen({ navigation }) {
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

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#1c6b3f', '#164f30', '#0f3a22']}
        style={styles.gradientTop}
      />
      <View style={styles.circleDecor1} />
      <View style={styles.circleDecor2} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topSection}>
          <Animated.View
            style={[
              styles.badge,
              { transform: [{ scale: badgeAnim }] },
            ]}
          >
            <Text style={styles.badgeIcon}>🌱</Text>
          </Animated.View>

          <Animated.View style={{ opacity: titleFade, transform: [{ translateY: titleAnim }] }}>
            <Text style={styles.eyebrow}>Programme de parentalité positive</Text>
            <Text style={styles.title}>RACINES</Text>
            <Text style={styles.subtitle}>
              Des conseils simples et fiables pour accompagner votre enfant,
              à chaque étape de sa vie.
            </Text>
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

          <Animated.View
            style={{ opacity: buttonFade, transform: [{ scale: buttonScale }] }}
          >
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={() => navigation.navigate('Catalog')}
            >
              <Text style={styles.buttonText}>Découvrir les modules</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.footer}>Contenus issus du guide officiel UNICEF Cameroun</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f7f4ee' },
  gradientTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '58%',
  },
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
  topSection: { paddingHorizontal: 28, paddingTop: 12, alignItems: 'flex-start' },
  badge: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  badgeIcon: { fontSize: 30 },
  eyebrow: {
    fontSize: 13, fontWeight: '600', color: '#d4c290',
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6,
  },
  title: {
    fontSize: 40, fontWeight: '900', color: '#fff',
    letterSpacing: 0.5, marginBottom: 14,
  },
  subtitle: { fontSize: 16, lineHeight: 24, color: 'rgba(255,255,255,0.85)', maxWidth: '92%' },
  sheet: {
    backgroundColor: '#f7f4ee', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 24, paddingTop: 28, paddingBottom: 8, marginTop: 24,
  },
  featuresRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  featurePill: {
    flex: 1, alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 14, paddingVertical: 14, marginHorizontal: 4,
    shadowColor: '#1c2733', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 1,
  },
  featureIcon: { fontSize: 20, marginBottom: 6 },
  featureLabel: { fontSize: 11, fontWeight: '600', color: '#4a5a68', textAlign: 'center' },
  button: {
    backgroundColor: '#1c6b3f', paddingVertical: 17, borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: '#1c6b3f', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  buttonPressed: { opacity: 0.9 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  buttonArrow: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: {
    textAlign: 'center', fontSize: 11, color: '#9aa5ad',
    marginTop: 16, marginBottom: 4,
  },
});