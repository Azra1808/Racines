// Illustration décorative par module, affichée en haut de l'écran de module
// (au-dessus du bouton "Écouter"). Pas de photo externe : un visuel SVG
// original, cohérent avec le reste des pictogrammes, qui fonctionne
// entièrement hors connexion.
import Svg, { Defs, LinearGradient, Stop, Rect, Circle, Path } from 'react-native-svg';
import PictoIcon from './icons/PictoIcon';
import { View, StyleSheet } from 'react-native';

// Palette de dégradés qui tourne selon l'index du module, pour que chaque
// module se distingue visuellement sur le catalogue et en en-tête.
const PALETTES = [
  ['#2f8f5b', '#164f30'],
  ['#3a7fc9', '#1a3d63'],
  ['#c98a2e', '#7a4f14'],
  ['#c9506e', '#732c3f'],
  ['#7a5fc9', '#3d2f70'],
];

function hashIndex(id, mod) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

export default function ModuleIllustration({ module, height = 130 }) {
  const paletteIndex = hashIndex(module.id, PALETTES.length);
  const [c1, c2] = PALETTES[paletteIndex];
  const gradId = `grad-${module.id}`;
  const mainPicto = module.pictogrammes[0];
  const secondPicto = module.pictogrammes[1];

  return (
    <View style={[styles.wrap, { height }]}>
      <Svg width="100%" height={height} viewBox={`0 0 340 ${height}`} preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={c1} />
            <Stop offset="1" stopColor={c2} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="340" height={height} rx="20" fill={`url(#${gradId})`} />
        {/* Formes décoratives */}
        <Circle cx="300" cy={height - 20} r="70" fill="#ffffff" opacity="0.08" />
        <Circle cx="40" cy="10" r="42" fill="#ffffff" opacity="0.07" />
        <Path
          d={`M0,${height} C60,${height - 30} 120,${height - 10} 180,${height - 28} C240,${height - 46} 290,${height - 18} 340,${height - 34} L340,${height} L0,${height} Z`}
          fill="#ffffff"
          opacity="0.06"
        />
      </Svg>
      <View style={styles.iconOverlay}>
        <View style={[styles.mainIconWrap]}>
          <PictoIcon name={mainPicto} size={40} color="#ffffff" />
        </View>
        {secondPicto && (
          <View style={styles.secondIconWrap}>
            <PictoIcon name={secondPicto} size={22} color="#ffffff" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', borderRadius: 20, overflow: 'hidden', marginBottom: 18, position: 'relative' },
  iconOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  mainIconWrap: {
    width: 68, height: 68, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.35)',
  },
  secondIconWrap: {
    position: 'absolute', bottom: 10, right: 26,
    width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center', justifyContent: 'center',
  },
});
