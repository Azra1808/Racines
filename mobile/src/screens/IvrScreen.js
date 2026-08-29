// Parcours vocal / IVR (T-048 / T-049).
//
// Le parent appelle un numéro et navigue à la voix, par touches. Aucun écran
// n'est nécessaire pour l'utiliser : c'est le seul canal accessible à un
// parent non lettré ou malvoyant.
//
// La transcription affichée sert deux publics : le jury (qui doit voir ce que
// le serveur dit) et les parents sourds ou malentendants. Elle n'est pas la
// fonctionnalité : la fonctionnalité, c'est le son.

import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import { useTheme } from '../context/ThemeContext';
import { NUMERO_VOCAL, LANGUES, resoudreEtapeIvr } from '../data/ivrMenu';
import { useLanguage } from '../context/LanguageContext';

const TOUCHES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export default function IvrScreen({ navigation }) {
  const { colors, rf } = useTheme();
  const { t } = useLanguage();
  const [enAppel, setEnAppel] = useState(false);
  const [etapes, setEtapes] = useState([]);
  const [parle, setParle] = useState(false);
  const scrollRef = useRef(null);

  const styles = getStyles(colors);
  const etat = enAppel ? resoudreEtapeIvr(etapes) : null;

  // Un appel qu'on quitte doit se taire : sinon la voix continue par-dessus
  // l'écran suivant. Bug classique, repéré au test écran éteint (P0-09).
  useEffect(() => () => { Speech.stop(); }, []);

  useEffect(() => {
    if (!etat) return;
    Speech.stop();
    setParle(true);
    Speech.speak(etat.texte, {
      language: 'fr-FR',
      onDone: () => setParle(false),
      onStopped: () => setParle(false),
      onError: () => setParle(false),
    });
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    // On ne redéclenche que lorsque le texte prononcé change réellement.
  }, [etat?.texte]);

  function appeler() {
    setEtapes([]);
    setEnAppel(true);
  }

  function raccrocher() {
    Speech.stop();
    setParle(false);
    setEnAppel(false);
    setEtapes([]);
  }

  function appuyerTouche(touche) {
    if (!etat) return;
    if (touche === '0') {          // réécouter : on relit l'étape courante
      Speech.stop();
      setEtapes((prev) => [...prev]);
      Speech.speak(etat.texte, { language: 'fr-FR', onDone: () => setParle(false) });
      setParle(true);
      return;
    }
    if (!etat.enCours) return;
    setEtapes((prev) => [...prev, touche]);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('ivr_title')}
        subtitle={t('ivr_subtitle')}
        onBack={() => navigation.goBack()}
      />

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { fontSize: rf(13) }]}>
          Un parent qui ne sait pas lire, ou qui ne voit pas, appelle le{' '}
          <Text style={styles.numero}>{NUMERO_VOCAL}</Text> et navigue à la voix.
          Aucun écran n'est nécessaire.
        </Text>

        <View style={styles.phone}>
          <View
            style={styles.phoneScreen}
            accessibilityLiveRegion="polite"
            accessibilityLabel={
              enAppel ? t('ivr_server_says', { texte: etat.texte }) : t('ivr_ready_to_call', { numero: NUMERO_VOCAL })
            }
          >
            {!enAppel ? (
              <>
                <Text style={[styles.numeroCompose, { fontSize: rf(28) }]}>
                  {NUMERO_VOCAL}
                </Text>
                <Text style={[styles.hint, { fontSize: rf(11) }]}>
                  {t('ivr_press_call')}
                </Text>
              </>
            ) : (
              <>
                <View style={styles.statutLigne}>
                  <View style={[styles.pastille, parle && styles.pastilleActive]} />
                  <Text style={[styles.statut, { fontSize: rf(11) }]}>
                    {parle ? t('ivr_server_speaking') : etat.enCours ? t('ivr_waiting') : t('ivr_call_ended')}
                  </Text>
                </View>
                <Text style={[styles.transcription, { fontSize: rf(13) }]}>
                  {etat.texte}
                </Text>
                <Text style={[styles.aide, { fontSize: rf(11) }]}>{etat.aide}</Text>
              </>
            )}
          </View>

          <View style={styles.keypad}>
            {TOUCHES.map((touche) => (
              <Pressable
                key={touche}
                style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
                onPress={() => appuyerTouche(touche)}
                disabled={!enAppel}
                accessibilityRole="button"
                accessibilityLabel={t('ivr_key', { touche })}
                accessibilityState={{ disabled: !enAppel }}
              >
                <Text style={[styles.keyText, { fontSize: rf(19) }]}>{touche}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionRow}>
            {!enAppel ? (
              <Pressable
                style={[styles.action, styles.actionPrimary]}
                onPress={appeler}
                accessibilityRole="button"
                accessibilityLabel={t('ivr_call_number', { numero: NUMERO_VOCAL })}
              >
                <UiIcon name="call" size={15} color={colors.accentText} />
                <Text style={styles.actionPrimaryText}>{t('ivr_call')}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.action, styles.actionDanger]}
                onPress={raccrocher}
                accessibilityRole="button"
                accessibilityLabel={t('ivr_hangup')}
              >
                <Text style={styles.actionDangerText}>{t('ivr_hangup')}</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* --- Langues : ce qui marche, et ce qui est daté --- */}
        <Text style={[styles.sectionTitre, { fontSize: rf(13) }]}>{t('ivr_languages_title')}</Text>
        <View style={styles.langues}>
          {LANGUES.map((langue) => (
            <View
              key={langue.code}
              style={[styles.langue, !langue.disponible && styles.langueAVenir]}
              accessibilityLabel={
                langue.disponible
                  ? `${langue.nom}, ${t('ivr_available')}`
                  : t('ivr_lang_coming', { langue: langue.nom, note: langue.note })
              }
            >
              <Text style={[styles.langueNom, { fontSize: rf(13) }]}>{langue.nom}</Text>
              <Text style={[styles.langueEtat, { fontSize: rf(10) }]}>
                {langue.disponible ? t('ivr_available') : langue.note}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { fontSize: rf(11) }]}>
            Le français est restitué par la synthèse vocale embarquée : aucun
            réseau, aucun coût. Les langues locales seront enregistrées par des
            locuteurs natifs identifiés — aucune traduction automatique ne sera
            diffusée sur un sujet touchant à l'enfant.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function getStyles(colors) {
  const contraste = colors.background === '#000000';
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 16, paddingBottom: 32 },
    intro: { color: colors.textSecondary, lineHeight: 19, marginBottom: 16 },
    numero: { fontWeight: '800', color: colors.accent },

    phone: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: 14,
      borderWidth: contraste ? 2 : 1,
      borderColor: colors.border,
    },
    phoneScreen: {
      backgroundColor: contraste ? '#000000' : '#12233a',
      borderRadius: 10,
      padding: 14,
      minHeight: 150,
      justifyContent: 'center',
      borderWidth: contraste ? 2 : 0,
      borderColor: colors.border,
    },
    numeroCompose: {
      color: '#9ad0ff', fontWeight: '700', textAlign: 'center', letterSpacing: 4,
    },
    hint: { color: '#6a95bd', textAlign: 'center', marginTop: 8 },
    statutLigne: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
    pastille: {
      width: 8, height: 8, borderRadius: 4, backgroundColor: '#6a95bd',
    },
    pastilleActive: { backgroundColor: '#7ee787' },
    statut: { color: '#6a95bd' },
    transcription: { color: '#9ad0ff', lineHeight: 20 },
    aide: {
      color: '#6a95bd', marginTop: 12, paddingTop: 10,
      borderTopWidth: 1, borderTopColor: 'rgba(154,208,255,0.25)',
    },

    keypad: {
      flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', marginTop: 14, rowGap: 8,
    },
    key: {
      width: '31%', paddingVertical: 12, borderRadius: 10,
      backgroundColor: colors.surfaceAlt, alignItems: 'center',
      borderWidth: contraste ? 1 : 0, borderColor: colors.border,
    },
    keyPressed: { opacity: 0.6 },
    keyText: { fontWeight: '700', color: colors.textPrimary },

    actionRow: { flexDirection: 'row', marginTop: 14 },
    action: {
      flex: 1, paddingVertical: 13, borderRadius: 12,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    },
    actionPrimary: { backgroundColor: colors.accent },
    actionPrimaryText: { color: colors.accentText, fontWeight: '700', fontSize: 15 },
    actionDanger: { backgroundColor: colors.danger },
    actionDangerText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },

    sectionTitre: {
      color: colors.textPrimary, fontWeight: '800', marginTop: 20, marginBottom: 8,
    },
    langues: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    langue: {
      flexGrow: 1, minWidth: '47%', padding: 10, borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      borderLeftWidth: 4, borderLeftColor: colors.accent,
    },
    langueAVenir: { borderLeftColor: colors.textMuted, opacity: 0.85 },
    langueNom: { color: colors.textPrimary, fontWeight: '700' },
    langueEtat: { color: colors.textSecondary, marginTop: 2 },

    disclaimer: {
      marginTop: 16, padding: 12, borderRadius: 10,
      borderWidth: 1, borderColor: colors.border,
    },
    disclaimerText: { color: colors.textMuted, lineHeight: 16 },
  });
}
