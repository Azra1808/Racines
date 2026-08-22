import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { MODULES } from '../data/modules';

export default function ModuleScreen({ route }) {
  const { moduleId } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  function handlePlay() {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }
    setProgress(0);
    setIsSpeaking(true);
    Speech.speak(module.body, {
      language: 'fr-FR',
      onBoundary: (event) => {
        const pct = Math.min(100, Math.round((event.charIndex / module.body.length) * 100));
        setProgress(pct);
      },
      onDone: () => {
        setIsSpeaking(false);
        setProgress(100);
        setCompleted(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  }

  if (!module) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Module introuvable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.category}>{module.category}</Text>
        <Text style={styles.title}>{module.title}</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Pressable style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>
            {isSpeaking ? '⏸ Arrêter la lecture' : '▶ Écouter le module'}
          </Text>
        </Pressable>

        <Text style={styles.body}>{module.body}</Text>

        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Module terminé</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ee' },
  notFound: { padding: 20, fontSize: 16, color: '#7a8a98' },
  content: { padding: 20 },
  category: {
    fontSize: 12, fontWeight: '700', color: '#c98a2e',
    textTransform: 'uppercase', marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#1c2733', marginBottom: 16 },
  progressTrack: {
    height: 6, backgroundColor: '#e8e2d5', borderRadius: 3,
    marginBottom: 16, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#1c6b3f' },
  playButton: {
    backgroundColor: '#1c6b3f', paddingVertical: 14, borderRadius: 10,
    alignItems: 'center', marginBottom: 20,
  },
  playButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 25, color: '#33414d' },
  completedBadge: {
    marginTop: 20, backgroundColor: '#e5f3ea', padding: 12,
    borderRadius: 8, alignItems: 'center',
  },
  completedText: { color: '#1c6b3f', fontWeight: '700' },
});