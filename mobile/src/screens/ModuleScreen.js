import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import * as Speech from 'expo-speech';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES } from '../data/modules';

export default function ModuleScreen({ route, navigation }) {
  const { moduleId } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    return () => Speech.stop();
  }, []);

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
      },
      onStopped: () => setIsSpeaking(false),
    });
  }

  if (!module) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Module introuvable" onBack={() => navigation.goBack()} />
      </View>
    );
  }

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.container}>
      <ScreenHeader title={module.titre} subtitle={module.thematique} onBack={() => navigation.goBack()} />
      <Animated.ScrollView contentContainerStyle={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.source}>Source : {module.moduleOrigine}</Text>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable style={styles.playButton} onPress={handlePlay}>
            <Text style={styles.playButtonText}>{isSpeaking ? '⏸ Arrêter la lecture' : '▶ Écouter le module'}</Text>
          </Pressable>
        </Animated.View>

        <Text style={styles.body}>{module.corpsApp}</Text>

        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Module terminé</Text>
          </View>
        )}

        {module.quiz.length > 0 && (
          <Pressable style={styles.quizButton} onPress={() => navigation.navigate('Quiz', { moduleId: module.id })}>
            <Text style={styles.quizButtonText}>📝 Tester mes connaissances</Text>
          </Pressable>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ee' },
  content: { padding: 20 },
  source: { fontSize: 12, color: '#7a8a98', marginBottom: 16, fontStyle: 'italic' },
  progressTrack: { height: 6, backgroundColor: '#e8e2d5', borderRadius: 3, marginBottom: 16, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#1c6b3f' },
  playButton: { backgroundColor: '#1c6b3f', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  playButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 25, color: '#33414d' },
  completedBadge: { marginTop: 20, backgroundColor: '#e5f3ea', padding: 12, borderRadius: 8, alignItems: 'center' },
  completedText: { color: '#1c6b3f', fontWeight: '700' },
  quizButton: { marginTop: 16, borderWidth: 2, borderColor: '#1c6b3f', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  quizButtonText: { color: '#1c6b3f', fontSize: 15, fontWeight: '700' },
});