import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES, PICTO_EMOJI } from '../data/modules';

function AnimatedCard({ item, index, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }}>
      <Pressable
        style={styles.card}
        onPress={onPress}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start()}
      >
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{PICTO_EMOJI[item.pictogrammes[0]] ?? '📘'}</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardCategory}>{item.thematique}</Text>
          <Text style={styles.cardTitle}>{item.titre}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function CatalogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Les modules"
        subtitle={`${MODULES.length} thématiques du programme officiel`}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <AnimatedCard item={item} index={index} onPress={() => navigation.navigate('Module', { moduleId: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ee' },
  list: { padding: 16, paddingTop: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 16, padding: 14, marginBottom: 12,
    shadowColor: '#1c2733', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  iconWrap: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: '#eef3ea',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  icon: { fontSize: 24 },
  cardText: { flex: 1 },
  cardCategory: { fontSize: 11, fontWeight: '700', color: '#c98a2e', textTransform: 'uppercase', marginBottom: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1c2733' },
  chevron: { fontSize: 22, color: '#c9c0ad', marginLeft: 8 },
});