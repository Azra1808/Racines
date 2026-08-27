import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { MODULES } from '../data/modules';
import { trouverReponse, LULU_FALLBACK } from '../data/luluResponses';
import { useTheme } from '../context/ThemeContext';
import { SUPABASE_URL, SUPABASE_ANON_KEY, LULU_PARENT_URL } from '../config/supabase';

const MESSAGE_ACCUEIL = {
  id: 'accueil',
  auteur: 'lulu',
  texte: 'Bonjour, je suis Lulu 🌱 Posez-moi une question sur votre enfant, je vous orienterai vers le bon module.',
};

// Interroge le vrai moteur (recherche + garde-fous, T-031 à T-034).
// Ne jamais laisser une erreur réseau bloquer le parent : en cas d'échec
// (hors connexion, clé non configurée...), on retombe sur le mode local
// par mots-clés, qui reste fonctionnel hors ligne.
async function interrogerLuluParent(question) {
  const reponse = await fetch(LULU_PARENT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ question, canal: 'app' }),
  });
  if (!reponse.ok) throw new Error(`Lulu Parent a répondu ${reponse.status}`);
  return reponse.json();
}

export default function LuluScreen({ navigation }) {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([MESSAGE_ACCUEIL]);
  const [saisie, setSaisie] = useState('');
  const [enAttente, setEnAttente] = useState(false);
  const listRef = useRef(null);

  const styles = getStyles(colors);

  function scrollVersLeBas() {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function reponseLocaleDeRepli(texte) {
    const regle = trouverReponse(texte);
    const module = regle ? MODULES.find((m) => m.id === regle.moduleId) : null;
    return {
      texte: regle ? regle.reponse : LULU_FALLBACK,
      moduleSuggere: regle?.type === 'urgence' ? null : module,
      estUrgent: regle?.type === 'urgence',
      horsLigne: true,
    };
  }

  async function envoyerMessage() {
    const texte = saisie.trim();
    if (!texte || enAttente) return;

    const messageUtilisateur = { id: `u-${Date.now()}`, auteur: 'utilisateur', texte };
    setMessages((prev) => [...prev, messageUtilisateur]);
    setSaisie('');
    setEnAttente(true);
    scrollVersLeBas();

    let contenuReponse;
    try {
      const resultat = await interrogerLuluParent(texte);
      const module = resultat.source
        ? MODULES.find((m) => m.id === resultat.source.unite_id)
        : null;
      contenuReponse = {
        texte: resultat.texte,
        moduleSuggere: module,
        source: resultat.source
          ? `${resultat.source.module_origine}`
          : null,
        // "alerte" et "renvoi_medical" doivent rester visuellement distincts
        // (garde-fou du plan §5.3, testé en P0-07 du plan de QA).
        estUrgent: resultat.type === 'alerte' || resultat.type === 'renvoi_medical',
      };
    } catch (_erreur) {
      // Hors ligne ou fonction indisponible : mode dégradé, jamais un écran bloqué.
      contenuReponse = reponseLocaleDeRepli(texte);
    }

    const messageLulu = {
      id: `l-${Date.now()}`,
      auteur: 'lulu',
      ...contenuReponse,
    };

    setMessages((prev) => [...prev, messageLulu]);
    setEnAttente(false);
    scrollVersLeBas();
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
              <View
                style={[styles.bubble, item.auteur === 'utilisateur' ? styles.bubbleUser : styles.bubbleLulu, item.estUrgent && styles.bubbleUrgent]}
                accessibilityLiveRegion={item.auteur === 'lulu' ? (item.estUrgent ? 'assertive' : 'polite') : 'none'}
              >
                <Text style={item.auteur === 'utilisateur' ? styles.bubbleTextUser : styles.bubbleTextLulu}>
                  {item.texte}
                </Text>
                {item.source && (
                  <Text style={styles.sourceText}>Source : {item.source}</Text>
                )}
                {item.horsLigne && (
                  <Text style={styles.sourceText}>Réponse hors connexion (mode dégradé)</Text>
                )}
                {item.moduleSuggere && (
                  <Pressable
                    style={styles.suggestionCard}
                    onPress={() => navigation.navigate('Module', { moduleId: item.moduleSuggere.id })}
                    accessibilityRole="button"
                    accessibilityLabel={`Ouvrir le module ${item.moduleSuggere.titre}`}
                  >
                    <Text style={styles.suggestionTitle}>{item.moduleSuggere.titre}</Text>
                    <Text style={styles.suggestionSource}>Source : {item.moduleSuggere.moduleOrigine}</Text>
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
            placeholderTextColor={colors.textMuted}
            value={saisie}
            onChangeText={setSaisie}
            onSubmitEditing={envoyerMessage}
            returnKeyType="send"
            accessibilityLabel="Votre question à Lulu"
            accessibilityHint="Écrivez une question sur votre enfant puis envoyez-la."
          />
          <Pressable
            style={[styles.sendButton, enAttente && styles.sendButtonDisabled]}
            onPress={envoyerMessage}
            disabled={enAttente}
            accessibilityRole="button"
            accessibilityLabel="Envoyer la question à Lulu"
            accessibilityHint="Lulu vous orientera vers un module approprié ou vers une aide urgente si nécessaire."
            accessibilityState={{ disabled: enAttente }}
          >
            <Text style={styles.sendButtonText}>{enAttente ? '…' : '➤'}</Text>
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
    bubbleUrgent: { backgroundColor: colors.dangerSoft, borderWidth: 2, borderColor: colors.danger },
    bubbleTextLulu: { color: colors.textPrimary, fontSize: 15, lineHeight: 21 },
    bubbleTextUser: { color: colors.accentText, fontSize: 15, lineHeight: 21 },
    suggestionCard: { marginTop: 10, backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 10 },
    suggestionTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
    suggestionSource: { fontSize: 11, color: colors.textSecondary, marginBottom: 4 },
    suggestionArrow: { fontSize: 12, color: colors.accent, fontWeight: '600' },
    sourceText: { fontSize: 11, color: colors.textMuted, marginTop: 6, fontStyle: 'italic' },
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
    sendButtonDisabled: { opacity: 0.5 },
    sendButtonText: { color: colors.accentText, fontSize: 18 },
  });
}
