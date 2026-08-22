import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MODULES } from '../data/modules';

export default function CatalogScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation.navigate('Module', { moduleId: item.id })}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ee' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e2d5',
  },
  cardPressed: { opacity: 0.7 },
  icon: { fontSize: 28, marginRight: 14 },
  cardText: { flex: 1 },
  cardCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c98a2e',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1c2733', marginBottom: 2 },
  cardDuration: { fontSize: 13, color: '#7a8a98' },
});