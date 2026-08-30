import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import { MODULES } from '../data/modules';
import { trouverReponse, LULU_FALLBACK } from '../data/luluResponses';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import Svg, { Path } from 'react-native-svg';

// Lulu répond entièrement depuis le téléphone : aucune requête réseau, donc
// aucune latence et aucun écran bloqué, y compris en mode avion.
//
// Le moteur de recherche documentaire côté serveur (T-031/T-034, fonction
// Supabase `lulu-parent`) reste dans le dépôt et sera activé en phase
// d'incubation. Pour la démonstration, la règle du plan s'applique : ne
// dépendre d'aucun service qui peut se mettre en veille pendant le pitch.

function MicIcon({ color, size = 17 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke={color} strokeWidth={1.7} />
      <Path d="M6 11a6 6 0 0 0 12 0M12 19v2" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

export default function LuluScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { id: 'accueil', auteur: 'lulu', texte: t('lulu_greeting') },
  ]);
  const [saisie, setSaisie] = useState('');
  const [enAttente, setEnAttente] = useState(false);
  const [ecoute, setEcoute] = useState(false);
  useSpeechRecognitionEvent('result', (event) => {
    const texte = event.results[0]?.transcript;
    if (texte) setSaisie(texte);
  });
  useSpeechRecognitionEvent('end', () => setEcoute(false));
  useSpeechRecognitionEvent('error', () => setEcoute(false));

  function basculerEcoute() {
    if (ecoute) {
      ExpoSpeechRecognitionModule.stop();
      setEcoute(false);
      return;
    }
    ExpoSpeechRecognitionModule.requestPermissionsAsync().then((result) => {
      if (result.granted) {
        ExpoSpeechRecognitionModule.start({ lang: 'fr-FR', continuous: false });
        setEcoute(true);
      }
    });
  }
  const listRef = useRef(null);

  const styles = getStyles(colors);

  function scrollVersLeBas() {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  function envoyerMessage() {
  const texte = saisie.trim();
  if (!texte || enAttente) return;

  const messageUtilisateur = { id: `u-${Date.now()}`, auteur: 'utilisateur', texte };
  setMessages((prev) => [...prev, messageUtilisateur]);
  setSaisie('');
  scrollVersLeBas();

  const regle = trouverReponse(texte);
  const module = regle ? MODULES.find((m) => m.id === regle.moduleId) : null;
  const estUrgent = regle?.type === 'urgence';

  const messageLulu = {
    id: `l-${Date.now()}`,
    auteur: 'lulu',
    texte: regle ? regle.reponse : LULU_FALLBACK,
    moduleSuggere: estUrgent ? null : module,
    estUrgent,
    source: !estUrgent && module ? module.moduleOrigine : null,
  };

  setMessages((prev) => [...prev, messageLulu]);
  scrollVersLeBas();
  Speech.speak(messageLulu.texte, { language: 'fr-FR' });
}

  return (
    <View style={styles.container}>
      <ScreenHeader title={t('lulu_title')} subtitle={t('lulu_subtitle')} onBack={() => navigation.goBack()} />

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
                {/* La source n'apparaît qu'une fois : portée par la carte du
                    module quand il y en a une, sinon affichée seule. */}
                {item.source && !item.moduleSuggere && (
                  <Text style={styles.sourceText}>{t('lulu_source')} : {item.source}</Text>
                )}
                {item.moduleSuggere && (
                  <Pressable
                    style={styles.suggestionCard}
                    onPress={() => navigation.navigate('Module', { moduleId: item.moduleSuggere.id })}
                    accessibilityRole="button"
                    accessibilityLabel={`Ouvrir le module ${item.moduleSuggere.titre}`}
                  >
                    <Text style={styles.suggestionTitle}>{item.moduleSuggere.titre}</Text>
                    <Text style={styles.suggestionSource}>
                      {t('lulu_source')} : {item.moduleSuggere.moduleOrigine}
                    </Text>
                    <View style={styles.suggestionAction}>
                      <Text style={styles.suggestionArrow}>{t('common_open_module')}</Text>
                      <UiIcon name="arrowRight" size={13} color={colors.accent} />
                    </View>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <Pressable
            style={[styles.micButton, ecoute && styles.micButtonActive]}
            onPress={basculerEcoute}
            accessibilityRole="button"
            accessibilityLabel={ecoute ? 'Arrêter l\'écoute' : 'Parler à Lulu'}
          >
            <MicIcon color={ecoute ? colors.dangerSoft ?? '#fff' : colors.accent} size={17} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder={t('lulu_placeholder')}
            placeholderTextColor={colors.textMuted}
            value={saisie}
            onChangeText={setSaisie}
            onSubmitEditing={envoyerMessage}
            returnKeyType="send"
            accessibilityLabel={t('lulu_input_a11y')}
            accessibilityHint={t('lulu_input_hint')}
          />
          <Pressable
            style={[styles.sendButton, enAttente && styles.sendButtonDisabled]}
            onPress={envoyerMessage}
            disabled={enAttente}
            accessibilityRole="button"
            accessibilityLabel={t('lulu_send_a11y')}
            accessibilityHint={t('lulu_send_hint')}
            accessibilityState={{ disabled: enAttente }}
          >
            {enAttente ? (
              <Text style={styles.sendButtonText}>…</Text>
            ) : (
              <UiIcon name="send" size={17} color={colors.accentText} />
            )}
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
    sourceText: { fontSize: 11, color: colors.textMuted, marginTop: 6, fontStyle: 'italic' },
    suggestionCard: { marginTop: 10, backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 10 },
    suggestionTitle: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
    suggestionSource: { fontSize: 11, color: colors.textSecondary, marginBottom: 4 },
    suggestionAction: { flexDirection: 'row', alignItems: 'center', gap: 5 },
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
        micButton: {
          width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center',
          borderWidth: 1.5, borderColor: colors.accent,
        },
    micButtonActive: { backgroundColor: colors.danger, borderColor: colors.danger },
    sendButtonDisabled: { opacity: 0.5 },
    sendButtonText: { color: colors.accentText, fontSize: 18 },
  });
}
