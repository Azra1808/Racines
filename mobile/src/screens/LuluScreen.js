import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES } from '../data/modules';
import { trouverReponse, LULU_FALLBACK } from '../data/luluResponses';

const MESSAGE_ACCUEIL = {
  id: 'accueil',
  auteur: 'lulu',
  texte: 'Bonjour, je suis Lulu 🌱 Posez-moi une question sur votre enfant, je vous orienterai vers le bon module.',
};

export default function LuluScreen({ navigation }) {
  const [messages, setMessages] = useState([MESSAGE_ACCUEIL]);
  const [saisie, setSaisie] = useState('');
  const listRef = useRef(null);

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
                {item.moduleSuggere && (
                  <Pressable
                    style={styles.suggestionCard}
                    onPress={() => navigation.navigate('Module', { moduleId: item.moduleSuggere.id })}
                  >
                    <Text style={styles.suggestionTitle}>{item.moduleSuggere.titre}</Text>
                    <Text style={styles.suggestionArrow}>Ouvrir le module →</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Écrivez votre question…"
            placeholderTextColor="#9aa5ad"
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ee' },
  list: { padding: 16, gap: 10 },
  bubbleRow: { flexDirection: 'row', marginBottom: 4 },
  bubbleRowRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '82%', borderRadius: 16, padding: 12 },
  bubbleLulu: { backgroundColor: '#fff', borderTopLeftRadius: 4 },
  bubbleUser: { backgroundColor: '#1c6b3f', borderTopRightRadius: 4 },
  bubbleTextLulu: { color: '#1c2733', fontSize: 15, lineHeight: 21 },
  bubbleTextUser: { color: '#fff', fontSize: 15, lineHeight: 21 },
  suggestionCard: {
    marginTop: 10, backgroundColor: '#eef3ea', borderRadius: 10, padding: 10,
  },
  suggestionTitle: { fontSize: 13, fontWeight: '700', color: '#1c2733', marginBottom: 4 },
  suggestionArrow: { fontSize: 12, color: '#1c6b3f', fontWeight: '600' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8,
    borderTopWidth: 1, borderTopColor: '#e8e2d5', backgroundColor: '#f7f4ee',
  },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 10, fontSize: 15, borderWidth: 1, borderColor: '#e8e2d5',
  },
  sendButton: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: '#1c6b3f',
    alignItems: 'center', justifyContent: 'center',
  },
  sendButtonText: { color: '#fff', fontSize: 18 },
});