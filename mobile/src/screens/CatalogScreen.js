import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import PictoIcon from '../components/icons/PictoIcon';
import UiIcon from '../components/icons/UiIcon';
import { MODULES } from '../data/modules';
import { getToutesLesProgressions } from '../data/db';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

function AnimatedCard({ item, index, progressions, colors, onPress, t }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 60, useNativeDriver: true }),
    ]).start();
  }, []);

  const styles = getStyles(colors);
  const bilanDone = !!progressions[item.id]?.bilan_termine;
  const moduleTermine = !!progressions[item.id]?.module_termine;

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }}>
      <Pressable
        style={[styles.card, { borderColor: colors.border, borderWidth: colors.background === '#000000' ? 1 : 0 }]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${item.titre}, ${item.thematique}${bilanDone ? ', ' + t('catalog_state_done') : moduleTermine ? ', ' + t('catalog_state_started') : ''}`}
        accessibilityHint={t('catalog_hint')}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start()}
      >
        <View style={styles.iconWrap}>
          <PictoIcon name={item.pictogrammes[0]} size={26} color={colors.accent} />
          {bilanDone ? (
            <View style={styles.doneBadge}>
              <UiIcon name="check" size={11} color="#ffffff" />
            </View>
          ) : moduleTermine ? (
            <View style={[styles.doneBadge, styles.readBadge]} />
          ) : null}
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardCategory}>{item.thematique}</Text>
          <Text style={styles.cardTitle}>{item.titre}</Text>
          <Text style={styles.cardMeta}>{t('catalog_card_meta', { parties: item.sousModules.length, questions: 20 })}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function CatalogScreen({ navigation }) {
  const [progressions, setProgressions] = useState({});
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = getStyles(colors);

  useFocusEffect(
    useCallback(() => {
      getToutesLesProgressions().then(setProgressions);
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t('catalog_title')}
        subtitle={t('catalog_subtitle', { n: MODULES.length })}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={MODULES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <AnimatedCard t={t}
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

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1 },
    list: { padding: 16, paddingTop: 20 },
    card: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
      borderRadius: 18, padding: 14, marginBottom: 12,
      shadowColor: '#1c2733', shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
    },
    iconWrap: {
      width: 50, height: 50, borderRadius: 15, backgroundColor: colors.surfaceAlt,
      alignItems: 'center', justifyContent: 'center', marginRight: 14, position: 'relative',
    },
    cardText: { flex: 1 },
    cardCategory: { fontSize: 11, fontWeight: '700', color: colors.accentSoft, textTransform: 'uppercase', marginBottom: 2 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
    cardMeta: { fontSize: 11, color: colors.textMuted, marginTop: 3 },
    chevron: { fontSize: 22, color: colors.textMuted, marginLeft: 8 },
    doneBadge: {
      position: 'absolute', top: -4, right: -4,
      width: 20, height: 20, borderRadius: 10,
      backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
      borderWidth: 2, borderColor: colors.surface,
    },
    readBadge: { backgroundColor: colors.accentSoft },
  });
}
