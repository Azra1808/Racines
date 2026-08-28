import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import { MODULES } from '../data/modules';
import { marquerSousModuleTermine, enregistrerScoreBilan } from '../data/db';
import { useTheme } from '../context/ThemeContext';

export default function QuizScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { moduleId, mode = 'submodule', sousModuleIndex = 0 } = route.params;
  const module = MODULES.find((m) => m.id === moduleId);

  const isBilan = mode === 'bilan';
  const sousModule = !isBilan ? module?.sousModules?.[sousModuleIndex] : null;
  const questions = isBilan ? module?.quiz ?? [] : sousModule?.questions ?? [];
  const isLastSousModule = sousModuleIndex >= (module?.sousModules?.length ?? 1) - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const styles = getStyles(colors);

  if (!module || questions.length === 0) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Quiz" onBack={() => navigation.goBack()} />
        <Text style={styles.empty}>Ce quiz arrive bientôt.</Text>
      </View>
    );
  }

  const question = questions[currentIndex];

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    const justScored = selected === question.correctIndex;
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const total = questions.length;
      const finalS = score + (justScored ? 1 : 0);
      setFinalScore(finalS);
      setFinished(true);
      if (isBilan) {
        enregistrerScoreBilan(module.id, finalS, total);
      } else {
        marquerSousModuleTermine(module.id, sousModuleIndex, finalS, total);
      }
    }
  }

  function goToModule() {
    navigation.navigate('Module', { moduleId: module.id });
  }

  function startBilan() {
    navigation.replace('Quiz', { moduleId: module.id, mode: 'bilan' });
  }

  function goToNextSousModule() {
    navigation.replace('Quiz', { moduleId: module.id, mode: 'submodule', sousModuleIndex: sousModuleIndex + 1 });
  }

  if (finished) {
    const perfect = finalScore === questions.length;
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="Résultat"
          subtitle={isBilan ? `Bilan · ${module.titre}` : `${sousModule.titre} · ${module.titre}`}
          onBack={goToModule}
        />
        <View style={styles.resultBox}>
          <View style={[styles.resultIconWrap, { backgroundColor: colors.surfaceAlt }]}>
            <UiIcon name={perfect ? 'trophy' : 'thumbsUp'} size={40} color={colors.accent} />
          </View>
          <Text style={styles.resultTitle}>
            {isBilan ? 'Bilan terminé !' : `Partie ${sousModuleIndex + 1} terminée !`}
          </Text>
          <Text style={styles.resultScore}>{finalScore} / {questions.length} bonnes réponses</Text>

          {!isBilan && isLastSousModule && (
            <Pressable style={styles.button} onPress={startBilan}>
              <UiIcon name="trophy" size={16} color={colors.accentText} />
              <Text style={styles.buttonText}>Faire le bilan du module (20 questions)</Text>
            </Pressable>
          )}

          {!isBilan && !isLastSousModule && (
            <Pressable style={styles.button} onPress={goToNextSousModule}>
              <Text style={styles.buttonText}>Partie suivante</Text>
            </Pressable>
          )}

          <Pressable style={styles.secondaryButton} onPress={goToModule}>
            <Text style={styles.secondaryButtonText}>Retour au module</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Question ${currentIndex + 1} / ${questions.length}`}
        subtitle={isBilan ? `Bilan · ${module.titre}` : `${sousModule.titre} · ${module.titre}`}
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
              {answered && isCorrect && <UiIcon name="check" size={18} color={colors.accent} />}
            </Pressable>
          );
        })}

        {answered && (
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentIndex + 1 < questions.length ? 'Question suivante' : 'Voir le résultat'}
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
    option: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
      borderRadius: 12, padding: 14, marginBottom: 10,
    },
    optionCorrect: { borderColor: colors.accent, backgroundColor: colors.surfaceAlt },
    optionWrong: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
    optionText: { fontSize: 15, color: colors.textPrimary, flex: 1, paddingRight: 8 },
    button: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      backgroundColor: colors.accent, paddingVertical: 14, paddingHorizontal: 16,
      borderRadius: 12, marginTop: 12,
    },
    buttonText: { color: colors.accentText, fontSize: 15, fontWeight: '700', textAlign: 'center' },
    secondaryButton: { paddingVertical: 14, alignItems: 'center', marginTop: 6 },
    secondaryButtonText: { color: colors.accent, fontSize: 14, fontWeight: '700' },
    resultBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    resultIconWrap: {
      width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    },
    resultTitle: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginBottom: 8, textAlign: 'center' },
    resultScore: { fontSize: 17, color: colors.textSecondary, marginBottom: 24 },
  });
}
