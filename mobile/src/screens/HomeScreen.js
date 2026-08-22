import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Programme de parentalité positive</Text>
        <Text style={styles.title}>Bienvenue sur RACINES</Text>
        <Text style={styles.subtitle}>
          Des conseils simples, en audio et en images, pour accompagner votre
          enfant à chaque étape — même sans connexion internet.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Catalog')}
      >
        <Text style={styles.buttonText}>Voir les modules</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4ee',
    padding: 24,
    justifyContent: 'space-between',
  },
  hero: {
    marginTop: 24,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '600',
    color: '#c98a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1c2733',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 23,
    color: '#4a5a68',
  },
  button: {
    backgroundColor: '#1c6b3f',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});