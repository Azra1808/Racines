import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES } from '../data/modules';
import { trouverReponse, LULU_FALLBACK } from '../data/luluResponses';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function LuluScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { id: 'accueil', auteur: 'lulu', texte: t('lulu_greeting') },
  ]);
  const [saisie, setSaisie] = useState('');
  const listRef = useRef(null);

  const styles = getStyles(colors);

  function envoyerMessage() {
    const texte = saisie.trim();
    if (!texte) return;

    const messageUtilisateur = { id: `u-${Date.now()}`, auteur: 'utilisateur', texte };
    const regle = trouverReponse(texte);
    const module = regle ? MODULES.find((m) => m.id === regle.moduleId) : null;

    const messageLulu = {
      id: `l-${Date.now()}`,
      auteur: 'lulu',
      texte: regle ? regle.reponse : LULU_FALLBACK,
      moduleSuggere: module,
      // Citation de la vraie référence du guide officiel (déjà présente
      // dans modules.js) — jamais inventée, toujours issue du corpus validé.
      source: module ? module.moduleOrigine : null,
    };

    setMessages((prev) => [...prev, messageUtilisateur, messageLulu]);
    setSaisie('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Lulu Parent" subtitle="Votre assistant RACINES" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.bubbleRow, item.auteur === 'utilisateur' && styles.bubbleRowRight]}>
              <View style={[styles.bubble, item.auteur === 'utilisateur' ? styles.bubbleUser : styles.bubbleLulu]}>
                <Text style={item.auteur === 'utilisateur' ? styles.bubbleTextUser : styles.bubbleTextLulu}>
                  {item.texte}
                </Text>
                {item.source && (
                  <Text style={styles.sourceText}>{t('lulu_source')} : {item.source}</Text>
                )}
                {item.moduleSuggere && (
                  <Pressable
                    style={styles.suggestionCard}
                    onPress={() => navigation.navigate('Module', { moduleId: item.moduleSuggere.id })}
                  >
                    <Text style={styles.suggestionTitle}>{item.moduleSuggere.titre}</Text>
                    <Text style={styles.suggestionArrow}>{t('common_open_module')} →</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={t('lulu_placeholder')}
            placeholderTextColor={colors.textMuted}
            value={saisie}
            onChangeText={setSaisie}
            onSubmitEditing={envoyerMessage}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={envoyerMessage}>
            <Text style={styles.sendButtonText}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function getStyles(colors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    list: { padding: 16, gap: 10 },
    bubbleRow: { flexDirection: 'row', marginBottom: 4 },
    bubbleRowRight: { justifyContent: 'flex-end' },
    bubble: { maxWidth: '82%', borderRadius: 16, padding: 12 },
    bubbleLulu: {
      backgroundColor: colors.surface, borderTopLeftRadius: 4,
      borderWidth: colors.background === '#000000' ? 1 : 0, borderColor: colors.border,
    },
    bubbleUser: { backgroundColor: colors.accent, borderTopRightRadius: 4 },
    bubbleTextLulu: { color: colors.textPrimary, fontSize: 15, lineHeight: 21 },
    bubbleTextUser: { color: colors.accentText, fontSize: 15, lineHeight: 21 },
    sourceText: { fontSize: 11, color: colors.textMuted, marginTop: 6, fontStyle: 'italic' },
    suggestionCard: { marginTop: 10, backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 10 },
    suggestionTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
    suggestionArrow: { fontSize: 12, color: colors.accent, fontWeight: '600' },
    inputRow: {
      flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8,
      borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background,
    },
    input: {
      flex: 1, backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 16,
      paddingVertical: 10, fontSize: 15, borderWidth: 1, borderColor: colors.border, color: colors.textPrimary,
    },
    sendButton: {
      width: 42, height: 42, borderRadius: 21, backgroundColor: colors.accent,
      alignItems: 'center', justifyContent: 'center',
    },
    sendButtonText: { color: colors.accentText, fontSize: 18 },
  });
}
