import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import UiIcon from './icons/UiIcon';

export default function ScreenHeader({ title, subtitle, onBack }) {
  const { colors, rf } = useTheme();
  const navigation = useNavigation();

  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
      <SafeAreaView edges={['top']}>
        <View style={styles.row}>
          {onBack && (
            <Pressable
              onPress={onBack}
              style={styles.iconButton}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Revenir à l'écran précédent"
            >
              <UiIcon name="arrowLeft" size={19} color="#ffffff" />
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
            accessibilityRole="button"
            accessibilityLabel="Ouvrir les réglages d'accessibilité"
          >
            <UiIcon name="settings" size={17} color="#ffffff" />
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
  textWrap: { flex: 1, marginHorizontal: 10 },
  title: { color: '#fff', fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.75)', marginTop: 2 },
});
