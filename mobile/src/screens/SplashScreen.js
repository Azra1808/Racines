import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient as ScreenGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Longueur approx. des tracés (pour l'effet "dessiné à la main")
const ROOT_LEFT_LENGTH = 70;
const ROOT_RIGHT_LENGTH = 70;
const RING_CIRCUMFERENCE = 2 * Math.PI * 70; // r = 70

export default function SplashScreen({ navigation }) {
  const { colors } = useTheme();

  // Étape 1 — la graine
  const seedOpacity = useRef(new Animated.Value(0)).current;
  const seedScale = useRef(new Animated.Value(0.3)).current;

  // Étape 2 — les racines se dessinent (trait qui se trace)
  const rootProgress = useRef(new Animated.Value(0)).current;
  const rootsFade = useRef(new Animated.Value(1)).current;

  // Étape 3 — l'emblème complet apparaît en un seul mouvement
  const emblemOpacity = useRef(new Animated.Value(0)).current;
  const emblemScale = useRef(new Animated.Value(0.82)).current;

  // Étape 4 — l'anneau se referme
  const ringProgress = useRef(new Animated.Value(0)).current;

  // Étape 5/6 — texte
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(10)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(seedOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.spring(seedScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(rootProgress, { toValue: 1, duration: 620, useNativeDriver: false }),
      Animated.parallel([
        Animated.timing(rootsFade, { toValue: 0, duration: 300, useNativeDriver: false }),
        Animated.timing(seedOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(80),
          Animated.parallel([
            Animated.timing(emblemOpacity, { toValue: 1, duration: 480, useNativeDriver: true }),
            Animated.spring(emblemScale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
          ]),
        ]),
      ]),
      Animated.timing(ringProgress, { toValue: 1, duration: 550, useNativeDriver: false }),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]),
      Animated.timing(sloganOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.delay(550),
    ]);

    sequence.start(() => {
      navigation.replace('Home');
    });

    return () => sequence.stop();
  }, []);

  const rootDashoffset = rootProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [ROOT_LEFT_LENGTH, 0],
  });

  const ringDashoffset = ringProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [RING_CIRCUMFERENCE - 26, 0],
  });

  const styles = getStyles(colors);

  return (
    <View style={styles.root}>
      <ScreenGradient colors={[colors.gradientStart, colors.gradientEnd]} style={StyleSheet.absoluteFill} />

      <View style={styles.center}>
        <View style={styles.emblemArea}>
          {/* --- Racines : tracé qui se dessine --- */}
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: rootsFade }]}>
            <Svg width="200" height="220" viewBox="0 0 200 220">
              <AnimatedPath
                d="M100,92 C88,108 78,118 70,140"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={ROOT_LEFT_LENGTH}
                strokeDashoffset={rootDashoffset}
              />
              <AnimatedPath
                d="M100,92 C112,108 122,118 130,140"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={ROOT_RIGHT_LENGTH}
                strokeDashoffset={rootDashoffset}
              />
              <AnimatedCircle
                cx={100}
                cy={90}
                r={4}
                fill="#eaf7ee"
                opacity={seedOpacity}
              />
            </Svg>
          </Animated.View>

          {/* --- Graine (rendue séparément pour contrôler son fondu) --- */}

          {/* --- L'emblème complet : anneau + famille + cœur + feuille --- */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { opacity: emblemOpacity, transform: [{ scale: emblemScale }] },
            ]}
          >
            <Svg width="200" height="220" viewBox="0 0 200 220">
              <Defs>
                <LinearGradient id="parentGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#3a9463" />
                  <Stop offset="1" stopColor="#12442a" />
                </LinearGradient>
                <LinearGradient id="childGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#b7e8c8" />
                  <Stop offset="1" stopColor="#7fce9d" />
                </LinearGradient>
                <LinearGradient id="leafGrad" x1="0" y1="1" x2="0" y2="0">
                  <Stop offset="0" stopColor="#2f8f5b" />
                  <Stop offset="1" stopColor="#8fe3ac" />
                </LinearGradient>
                <LinearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#f28aa0" />
                  <Stop offset="1" stopColor="#e1516e" />
                </LinearGradient>
              </Defs>

              {/* Anneau (dessiné à l'étape suivante) */}
              <AnimatedCircle
                cx={100}
                cy={118}
                r={70}
                stroke="#f4efe4"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${RING_CIRCUMFERENCE - 26},26`}
                strokeDashoffset={ringDashoffset}
                rotation={-96}
                origin="100,118"
              />

              {/* Feuille (sortant du haut de l'anneau) */}
              <G transform="translate(100,32)">
                <Path
                  d="M0,-4 C-11,-2 -15,7 -8,18 C-4,22 0,22 0,18 Z"
                  fill="url(#leafGrad)"
                  transform="rotate(-14)"
                />
                <Path
                  d="M0,-4 C11,-2 15,7 8,18 C4,22 0,22 0,18 Z"
                  fill="url(#leafGrad)"
                  transform="rotate(14)"
                />
              </G>

              {/* Parent gauche */}
              <Circle cx={72} cy={82} r={10} fill="url(#parentGrad)" />
              <Path d="M54,130 Q72,90 90,130 Z" fill="url(#parentGrad)" />

              {/* Parent droit */}
              <Circle cx={128} cy={82} r={10} fill="url(#parentGrad)" />
              <Path d="M110,130 Q128,90 146,130 Z" fill="url(#parentGrad)" />

              {/* Enfant, au premier plan */}
              <Circle cx={100} cy={106} r={7} fill="url(#childGrad)" />
              <Path d="M86,136 Q100,110 114,136 Z" fill="url(#childGrad)" />

              {/* Cœur à la base */}
              <G transform="translate(100,131) scale(0.5)">
                <Path
                  d="M0,-6 C-8,-14 -20,-6 -20,4 C-20,14 -8,20 0,28 C8,20 20,14 20,4 C20,-6 8,-14 0,-6 Z"
                  fill="url(#heartGrad)"
                />
              </G>
            </Svg>
          </Animated.View>
        </View>

        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }] }}>
          <Text style={styles.title}>RACINES</Text>
        </Animated.View>

        <Animated.Text style={[styles.slogan, { opacity: sloganOpacity }]}>
          Grandir avec amour, dès les premières racines.
        </Animated.Text>
      </View>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.gradientStart },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emblemArea: {
      width: 200,
      height: 220,
      marginBottom: 8,
    },
    title: {
      fontSize: 40,
      fontWeight: '900',
      color: '#fff',
      letterSpacing: 1,
      textAlign: 'center',
    },
    slogan: {
      marginTop: 10,
      fontSize: 14,
      fontStyle: 'italic',
      color: 'rgba(255,255,255,0.9)',
      textAlign: 'center',
      maxWidth: '85%',
      alignSelf: 'center',
    },
  });
}
