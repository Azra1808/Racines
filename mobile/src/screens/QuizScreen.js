import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES } from '../data/modules';
import { enregistrerScoreQuiz } from '../data/db';
import { useTheme } from '../context/ThemeContext';

export default function QuizScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { moduleId } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const styles = getStyles(colors);

  if (!module || module.quiz.length === 0) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Quiz" onBack={() => navigation.goBack()} />
        <Text style={styles.empty}>Le quiz de ce module arrive bientôt.</Text>
      </View>
    );
  }

  const question = module.quiz[currentIndex];

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentIndex + 1 < module.quiz.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      enregistrerScoreQuiz(module.id, score + (selected === question.correctIndex ? 1 : 0), module.quiz.length);
    }
  }

  if (finished) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Résultat" subtitle={module.titre} onBack={() => navigation.goBack()} />
        <View style={styles.resultBox}>
          <Text style={styles.resultEmoji}>{score === module.quiz.length ? '🎉' : '👍'}</Text>
          <Text style={styles.resultTitle}>Quiz terminé !</Text>
          <Text style={styles.resultScore}>{score} / {module.quiz.length} bonnes réponses</Text>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Retour au module</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Question ${currentIndex + 1} / ${module.quiz.length}`}
        subtitle={module.titre}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = index === selected;
          let optionStyle = [styles.option];
          if (answered && isCorrect) optionStyle.push(styles.optionCorrect);
          else if (answered && isSelected && !isCorrect) optionStyle.push(styles.optionWrong);

          return (
            <Pressable key={index} style={optionStyle} onPress={() => handleSelect(index)}>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}

        {answered && (
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentIndex + 1 < module.quiz.length ? 'Question suivante' : 'Voir le résultat'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    empty: { padding: 20, fontSize: 16, color: colors.textMuted },
    content: { padding: 20 },
    question: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, marginBottom: 20, marginTop: 4 },
    option: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, marginBottom: 10 },
    optionCorrect: { borderColor: colors.accent, backgroundColor: colors.surfaceAlt },
    optionWrong: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
    optionText: { fontSize: 15, color: colors.textPrimary },
    button: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
    buttonText: { color: colors.accentText, fontSize: 15, fontWeight: '700' },
    resultBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    resultEmoji: { fontSize: 48, marginBottom: 12 },
    resultTitle: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginBottom: 8 },
    resultScore: { fontSize: 18, color: colors.textSecondary, marginBottom: 24 },
  });
}