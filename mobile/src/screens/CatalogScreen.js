import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES, PICTO_EMOJI } from '../data/modules';
import { getToutesLesProgressions } from '../data/db';
import { useTheme } from '../context/ThemeContext';

function AnimatedCard({ item, index, progressions, colors, onPress }) {
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
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: colors.background === '#000000' ? 1 : 0 }]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${item.titre}, ${item.thematique}${progressions[item.id]?.module_termine ? ', terminé' : ''}`}
        accessibilityHint="Ouvre le module et sa lecture audio."
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start()}
      >
        <View style={[styles.iconWrap, { backgroundColor: colors.surfaceAlt }]}>
          <Text style={styles.icon}>{PICTO_EMOJI[item.pictogrammes[0]] ?? '📘'}</Text>
          {progressions[item.id]?.module_termine ? (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>✓</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardCategory, { color: colors.accent }]}>{item.thematique}</Text>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.titre}</Text>
        </View>
        <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function CatalogScreen({ navigation }) {
  const [progressions, setProgressions] = useState({});
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      getToutesLesProgressions().then(setProgressions);
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          <AnimatedCard
            item={item}
            index={index}
            progressions={progressions}
            colors={colors}
            onPress={() => navigation.navigate('Module', { moduleId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingTop: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 14, marginBottom: 12,
    shadowColor: '#1c2733', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  iconWrap: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 14, position: 'relative',
  },
  icon: { fontSize: 24 },
  cardText: { flex: 1 },
  cardCategory: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  chevron: { fontSize: 22, marginLeft: 8 },
  doneBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#1c6b3f', alignItems: 'center', justifyContent: 'center',
  },
  doneBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});
