import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <LinearGradient colors={['#1c6b3f', '#164f30']} style={styles.gradient}>
      <SafeAreaView edges={['top']}>
        <View style={styles.row}>
          {onBack && (
            <Pressable onPress={onBack} style={styles.backButton} hitSlop={12}>
              <Text style={styles.backIcon}>←</Text>
            </Pressable>
          )}
          <View style={styles.textWrap}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 6 },
  backButton: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  backIcon: { color: '#fff', fontSize: 20, fontWeight: '700' },
  textWrap: { flex: 1 },
  title: { color: '#fff', fontSize: 19, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 },
});