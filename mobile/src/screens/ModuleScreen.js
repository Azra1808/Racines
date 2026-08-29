import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import ScreenHeader from '../components/ScreenHeader';
import PictoIcon from '../components/icons/PictoIcon';
import UiIcon from '../components/icons/UiIcon';
import ModuleIllustration from '../components/ModuleIllustration';
import { MODULES } from '../data/modules';
import { marquerModuleTermine, getProgressionModule, getProgressionSousModules } from '../data/db';
import { useTheme } from '../context/ThemeContext';

function SousModuleCard({ sousModule, index, progress, colors, styles, onPress }) {
  const done = !!progress?.termine;
  return (
    <Pressable
      style={[
        styles.smCard,
        { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: colors.background === '#000000' ? 1 : 0 },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Partie ${index + 1} : ${sousModule.titre}${done ? ', terminée' : ''}`}
      accessibilityHint="Ouvre les cinq questions de cette partie."
    >
      <View style={[styles.smIconWrap, { backgroundColor: colors.surfaceAlt }]}>
        <PictoIcon name={sousModule.icone} size={22} color={colors.accent} />
      </View>
      <View style={styles.smText}>
        <Text style={styles.smEyebrow}>Partie {index + 1}</Text>
        <Text style={styles.smTitle}>{sousModule.titre}</Text>
        <Text style={styles.smDesc} numberOfLines={1}>{sousModule.description}</Text>
      </View>
      {done ? (
        <UiIcon name="checkFilled" size={22} color={colors.accent} />
      ) : (
        <Text style={styles.smCount}>5 Q</Text>
      )}
    </Pressable>
  );
}

export default function ModuleScreen({ route, navigation }) {
  const { colors, isSimplifiedMode } = useTheme();
  const { moduleId } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sousModuleProgress, setSousModuleProgress] = useState({});
  const [progressionModule, setProgressionModule] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    return () => Speech.stop();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!module) return;
      getProgressionModule(module.id).then((row) => {
        if (row?.module_termine) setCompleted(true);
        setProgressionModule(row ?? null);
      });
      getProgressionSousModules(module.id).then(setSousModuleProgress);
    }, [module?.id])
  );

  useEffect(() => {
    if (isSpeaking) {
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.04, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      pulseLoop.current.start();
    } else {
      pulseLoop.current?.stop();
      pulseAnim.setValue(1);
    }
  }, [isSpeaking]);

  function handlePlay() {
    if (isSpeaking) { Speech.stop(); setIsSpeaking(false); return; }
    progressAnim.setValue(0);
    setIsSpeaking(true);
    Speech.speak(module.corpsApp, {
      language: 'fr-FR',
      onBoundary: (event) => {
        const pct = Math.min(1, event.charIndex / module.corpsApp.length);
        Animated.timing(progressAnim, { toValue: pct, duration: 150, useNativeDriver: false }).start();
      },
      onDone: () => {
        setIsSpeaking(false);
        Animated.timing(progressAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
        setCompleted(true);
        marquerModuleTermine(module.id);
      },
      onStopped: () => setIsSpeaking(false),
    });
  }

  const styles = getStyles(colors);

  if (!module) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Module introuvable" onBack={() => navigation.goBack()} />
      </View>
    );
  }

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const doneCount = Object.values(sousModuleProgress).filter((r) => r?.termine).length;
  const allSousModulesDone = doneCount >= module.sousModules.length;
  const bilanDone = !!progressionModule?.bilan_termine;

  return (
    <View style={styles.container}>
      <ScreenHeader title={module.titre} subtitle={module.thematique} onBack={() => navigation.goBack()} />
      <Animated.ScrollView contentContainerStyle={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.source}>Source : {module.moduleOrigine}</Text>

        <ModuleIllustration module={module} />

        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityLabel="Progression de la lecture audio"
          accessibilityValue={{ text: isSpeaking ? 'Lecture en cours' : 'Lecture arrêtée' }}
        >
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable
            style={styles.playButton}
            onPress={handlePlay}
            accessibilityRole="button"
            accessibilityLabel={isSpeaking ? 'Arrêter la lecture audio' : 'Écouter le module'}
            accessibilityHint="La lecture dépend de la voix française disponible sur le téléphone."
          >
            <UiIcon name={isSpeaking ? 'pause' : 'play'} size={18} color={colors.accentText} />
            <Text style={styles.playButtonText}>{isSpeaking ? 'Arrêter la lecture' : 'Écouter le module'}</Text>
          </Pressable>
        </Animated.View>

        {isSimplifiedMode ? (
          <View style={styles.simplifiedBox}>
            <View style={styles.pictoRow}>
              {module.pictogrammes.map((p, i) => (
                <View key={i} style={styles.pictoIconWrap}>
                  <PictoIcon name={p} size={30} color={colors.accent} />
                </View>
              ))}
            </View>
            <Text style={styles.simplifiedText}>{module.resumeSms}</Text>
          </View>
        ) : (
          <Text style={styles.body}>{module.corpsApp}</Text>
        )}

        {completed && (
          <View style={styles.completedBadge}>
            <UiIcon name="check" size={16} color={colors.accent} />
            <Text style={styles.completedText}>Module lu</Text>
          </View>
        )}

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Les 4 parties du module</Text>
          <Text style={styles.sectionCount}>{doneCount}/{module.sousModules.length}</Text>
        </View>

        <View style={styles.smList}>
          {module.sousModules.map((sm, i) => (
            <SousModuleCard
              key={sm.id}
              sousModule={sm}
              index={i}
              progress={sousModuleProgress[i]}
              colors={colors}
              styles={styles}
              onPress={() => navigation.navigate('SousModule', { moduleId: module.id, sousModuleIndex: i })}
            />
          ))}
        </View>

        <Pressable
          style={[styles.bilanButton, !allSousModulesDone && styles.bilanButtonLocked]}
          onPress={() => allSousModulesDone && navigation.navigate('Quiz', { moduleId: module.id, mode: 'bilan' })}
          disabled={!allSousModulesDone}
          accessibilityRole="button"
          accessibilityState={{ disabled: !allSousModulesDone }}
          accessibilityLabel={
            allSousModulesDone
              ? `${bilanDone ? 'Refaire le bilan' : 'Bilan'} du module ${module.titre}, 20 questions`
              : `Bilan verrouillé : terminez les ${module.sousModules.length} parties pour le débloquer`
          }
        >
          <View style={[styles.bilanIconWrap, { backgroundColor: allSousModulesDone ? 'rgba(255,255,255,0.18)' : colors.border }]}>
            <UiIcon name={allSousModulesDone ? 'trophy' : 'lock'} size={20} color={allSousModulesDone ? colors.accentText : colors.textMuted} />
          </View>
          <View style={styles.smText}>
            <Text style={[styles.bilanTitle, { color: allSousModulesDone ? colors.accentText : colors.textMuted }]}>
              {bilanDone ? 'Refaire le bilan du module' : 'Bilan du module'}
            </Text>
            <Text style={[styles.bilanDesc, { color: allSousModulesDone ? colors.accentText : colors.textMuted }]}>
              {allSousModulesDone
                ? '20 questions pour valider tout ce que vous avez appris'
                : `Terminez les ${module.sousModules.length} parties pour débloquer le bilan`}
            </Text>
          </View>
        </Pressable>
      </Animated.ScrollView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, paddingBottom: 40 },
    source: { fontSize: 12, color: colors.textMuted, marginBottom: 16, fontStyle: 'italic' },
    progressTrack: { height: 6, backgroundColor: colors.border, borderRadius: 3, marginBottom: 16, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: colors.accent },
    playButton: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 10, marginBottom: 20,
    },
    playButtonText: { color: colors.accentText, fontSize: 15, fontWeight: '700' },
    body: { fontSize: 16, lineHeight: 25, color: colors.textPrimary },
    completedBadge: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginTop: 20, backgroundColor: colors.surfaceAlt, padding: 12,
      borderRadius: 8,
      borderWidth: colors.background === '#000000' ? 1 : 0, borderColor: colors.accent,
    },
    completedText: { color: colors.accent, fontWeight: '700' },

    simplifiedBox: {
      backgroundColor: colors.surfaceAlt, borderRadius: 16, padding: 20,
      alignItems: 'center',
    },
    pictoRow: { flexDirection: 'row', gap: 14, marginBottom: 16 },
    pictoIconWrap: {
      width: 52, height: 52, borderRadius: 16, backgroundColor: colors.surface,
      alignItems: 'center', justifyContent: 'center',
    },
    simplifiedText: {
      fontSize: 20, lineHeight: 30, color: colors.textPrimary,
      textAlign: 'center', fontWeight: '600',
    },

    sectionHeaderRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
      marginTop: 28, marginBottom: 12,
    },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
    sectionCount: { fontSize: 13, fontWeight: '700', color: colors.accentSoft },
    smList: { gap: 10 },
    smCard: {
      flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 12,
      shadowColor: '#1c2733', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 1,
    },
    smIconWrap: {
      width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12,
    },
    smText: { flex: 1 },
    smEyebrow: { fontSize: 10, fontWeight: '800', color: colors.accentSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 1 },
    smTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
    smDesc: { fontSize: 12, marginTop: 1, color: colors.textMuted },
    smCount: { fontSize: 12, fontWeight: '700', marginLeft: 8, color: colors.textMuted },

    bilanButton: {
      flexDirection: 'row', alignItems: 'center', marginTop: 18,
      backgroundColor: colors.accent, borderRadius: 16, padding: 16,
    },
    bilanButtonLocked: { backgroundColor: colors.surfaceAlt },
    bilanIconWrap: {
      width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 14,
    },
    bilanTitle: { fontSize: 15, fontWeight: '800' },
    bilanDesc: { fontSize: 12, marginTop: 2, opacity: 0.9 },
  });
}
