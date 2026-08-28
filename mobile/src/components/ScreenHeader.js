import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function ScreenHeader({ title, subtitle, onBack }) {
  const { colors, rf } = useTheme();
  const navigation = useNavigation();

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView edges={['top']}>
        <View style={styles.row}>
          {onBack && (
            <Pressable onPress={onBack} style={styles.iconButton} hitSlop={12}>
              <Text style={styles.backIcon}>←</Text>
            </Pressable>
          )}
          <View style={styles.textWrap}>
            <Text style={[styles.title, { fontSize: rf(19) }]} numberOfLines={1}>{title}</Text>
            {subtitle ? (
              <Text style={[styles.subtitle, { fontSize: rf(12) }]} numberOfLines={1}>{subtitle}</Text>
            ) : null}
          </View>
          <Pressable
            onPress={() => navigation.navigate('Accessibility')}
            style={styles.iconButton}
            hitSlop={12}
            accessibilityLabel="Ouvrir les réglages d'accessibilité"
          >
            <Text style={styles.accessIcon}>⚙️</Text>
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
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 20, fontWeight: '700' },
  accessIcon: { fontSize: 17 },
  textWrap: { flex: 1, marginHorizontal: 10 },
  title: { color: '#fff', fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.75)', marginTop: 2 },
});