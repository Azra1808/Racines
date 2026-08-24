import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function ScreenHeader({ title, subtitle, onBack }) {
  const { colors, isHighContrast, toggleContrast } = useTheme();

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView edges={['top']}>
        <View style={styles.row}>
          {onBack && (
            <Pressable
              onPress={onBack}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Revenir à l'écran précédent"
              accessibilityHint="Retourne à l'écran précédent."
            >
              <Text style={[styles.backIcon, { color: colors.accentText === '#000000' ? '#000' : '#fff' }]}>←</Text>
            </Pressable>
          )}
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <Pressable
            onPress={toggleContrast}
            style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Basculer le contraste élevé"
            accessibilityHint={isHighContrast ? 'Désactive le contraste élevé.' : 'Active le contraste élevé.'}
          >
            <Text style={styles.contrastIcon}>{isHighContrast ? '☀️' : '🌓'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 6 },
  iconButton: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 20, fontWeight: '700', marginRight: 12 },
  contrastIcon: { fontSize: 18 },
  textWrap: { flex: 1, marginLeft: 4 },
  title: { fontSize: 19, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 12, marginTop: 2, color: 'rgba(255,255,255,0.75)' },
});
