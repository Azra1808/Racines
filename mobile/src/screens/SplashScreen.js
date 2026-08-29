import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient as ScreenGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

// Longueur du tracé de la tige (pour l'effet "pousse")
const STEM_LENGTH = 115;

// Les 6 pétales de la fleur, répartis autour du centre
const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

export default function SplashScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  // Étape 1 — la graine dans le pot
  const potOpacity = useRef(new Animated.Value(0)).current;
  const potScale = useRef(new Animated.Value(0.6)).current;
  const seedOpacity = useRef(new Animated.Value(1)).current;

  // Étape 2 — la tige pousse (trait qui se trace) + feuilles
  const stemProgress = useRef(new Animated.Value(0)).current;
  const leavesOpacity = useRef(new Animated.Value(0)).current;

  // Étape 3 — le bourgeon s'ouvre en fleur (pétales : rotation + largeur)
  const bloomProgress = useRef(new Animated.Value(0)).current;

  // Étape 4 — texte
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(10)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(potOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.spring(potScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(stemProgress, { toValue: 1, duration: 620, useNativeDriver: false }),
        Animated.sequence([
          Animated.delay(280),
          Animated.timing(leavesOpacity, { toValue: 1, duration: 320, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(seedOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]),
      ]),
      Animated.timing(bloomProgress, { toValue: 1, duration: 850, useNativeDriver: false }),
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

  const stemDashoffset = stemProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [STEM_LENGTH, 0],
  });

  // Le cœur + la famille apparaissent une fois la fleur bien ouverte
  const emblemOpacity = bloomProgress.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0, 0, 1],
  });
  const emblemScale = bloomProgress.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0.5, 0.5, 1],
  });

  const styles = getStyles(colors);

  return (
    <View style={styles.root}>
      <ScreenGradient colors={[colors.gradientStart, colors.gradientEnd]} style={StyleSheet.absoluteFill} />

      <View style={styles.center}>
        <View style={styles.emblemArea}>
          <Svg width="200" height="220" viewBox="0 0 200 220">
            <Defs>
              <LinearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#c98a52" />
                <Stop offset="1" stopColor="#8a5a2e" />
              </LinearGradient>
              <LinearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#2f8f5b" />
                <Stop offset="1" stopColor="#6fce93" />
              </LinearGradient>
              <LinearGradient id="petalGradA" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#e1516e" />
                <Stop offset="1" stopColor="#f6a6b8" />
              </LinearGradient>
              <LinearGradient id="petalGradB" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor="#f28aa0" />
                <Stop offset="1" stopColor="#ffe3ea" />
              </LinearGradient>
              <LinearGradient id="parentGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#4aab74" />
                <Stop offset="1" stopColor="#1a5c3a" />
              </LinearGradient>
              <LinearGradient id="childGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#dff5e6" />
                <Stop offset="1" stopColor="#8fd9ab" />
              </LinearGradient>
              <LinearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#f6a6b8" />
                <Stop offset="1" stopColor="#e1516e" />
              </LinearGradient>
            </Defs>

            {/* --- Pot --- */}
            <G opacity={1}>
              <AnimatedG
                opacity={potOpacity}
                originX={100}
                originY={190}
                scale={potScale}
              >
                <Path d="M76,178 L124,178 L117,206 L83,206 Z" fill="url(#potGrad)" />
                <Path d="M74,178 Q100,170 126,178" stroke="#6b4322" strokeWidth={2} fill="none" strokeLinecap="round" />
              </AnimatedG>

              {/* Graine visible dans le pot avant la pousse */}
              <AnimatedCircle cx={100} cy={174} r={4} fill="#eaf7ee" opacity={seedOpacity} />

              {/* --- Tige qui pousse --- */}
              <AnimatedPath
                d="M100,178 L100,63"
                stroke="url(#stemGrad)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={STEM_LENGTH}
                strokeDashoffset={stemDashoffset}
              />

              {/* --- Petites feuilles le long de la tige --- */}
              <Animated.G opacity={leavesOpacity}>
                <G transform="translate(100,140)">
                  <Path
                    d="M0,0 C-16,-3 -24,6 -18,16 C-13,22 -3,20 0,10 Z"
                    fill="url(#stemGrad)"
                  />
                </G>
                <G transform="translate(100,118)">
                  <Path
                    d="M0,0 C16,-3 24,6 18,16 C13,22 3,20 0,10 Z"
                    fill="url(#stemGrad)"
                  />
                </G>
              </Animated.G>
            </G>

            {/* --- Fleur : bourgeon qui s'ouvre --- */}
            <G transform="translate(100,60)">
              {PETAL_ANGLES.map((angle, i) => {
                const rotation = bloomProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, angle],
                });
                const scaleX = bloomProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.32, 1],
                });
                const scaleY = bloomProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.88, 1.05],
                });
                return (
                  <AnimatedG
                    key={angle}
                    rotation={rotation}
                    scaleX={scaleX}
                    scaleY={scaleY}
                    originX={0}
                    originY={0}
                  >
                    <Path
                      d="M0,0 C-11,-14 -10,-30 0,-42 C10,-30 11,-14 0,0 Z"
                      fill={i % 2 === 0 ? 'url(#petalGradA)' : 'url(#petalGradB)'}
                    />
                  </AnimatedG>
                );
              })}

              {/* --- Emblème révélé au cœur de la fleur ouverte --- */}
              <AnimatedG opacity={emblemOpacity} scale={emblemScale} originX={0} originY={-18}>
                <G transform="translate(0,-18)">
                  <Circle cx={0} cy={0} r={26} stroke="#f4efe4" strokeWidth={2} fill="none" />

                  {/* Parent gauche */}
                  <Circle cx={-9} cy={-8} r={5} fill="url(#parentGrad)" />
                  <Path d="M-16,10 C-16,-1 -13,-6 -9,-6 C-5,-6 -2,-1 -2,10 Z" fill="url(#parentGrad)" />

                  {/* Parent droit */}
                  <Circle cx={9} cy={-8} r={5} fill="url(#parentGrad)" />
                  <Path d="M2,10 C2,-1 5,-6 9,-6 C13,-6 16,-1 16,10 Z" fill="url(#parentGrad)" />

                  {/* Enfant, au premier plan */}
                  <Circle cx={0} cy={-2} r={3.5} fill="url(#childGrad)" />
                  <Path d="M-5,11 C-5,3 -2,-0.5 0,-0.5 C2,-0.5 5,3 5,11 Z" fill="url(#childGrad)" />

                  {/* Cœur à la base */}
                  <G transform="translate(0,15) scale(0.34)">
                    <Path
                      d="M0,-6 C-8,-14 -20,-6 -20,4 C-20,14 -8,20 0,28 C8,20 20,14 20,4 C20,-6 8,-14 0,-6 Z"
                      fill="url(#heartGrad)"
                    />
                  </G>
                </G>
              </AnimatedG>
            </G>
          </Svg>
        </View>

        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }] }}>
          <Text style={styles.title}>RACINES</Text>
        </Animated.View>

        <Animated.Text style={[styles.slogan, { opacity: sloganOpacity }]}>
          {t('splash_slogan')}
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
