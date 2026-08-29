// Simulateur de parcours USSD (T-036 / T-037).
//
// Ce que cet écran EST : une reproduction fidèle du parcours qu'un parent
// vivrait sur un téléphone basique, alimentée par le même contenu que
// l'application (aucune duplication — cf. modèle de contenu central §5.1).
//
// Ce que cet écran N'EST PAS : un raccordement opérateur en production.
// Le bandeau en bas de l'écran le dit explicitement au jury. Le passage en
// production est un sujet contractuel (raccordement ARTC), chiffré au budget
// et prévu en phase d'incubation.

import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { useTheme } from '../context/ThemeContext';
import {
  CODE_COURT, LIMITE_CARACTERES_USSD, resoudreEcranUssd, sansAccents,
} from '../data/ussdMenu';
import { useLanguage } from '../context/LanguageContext';

const TOUCHES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

export default function UssdScreen({ navigation }) {
  const { colors, rf } = useTheme();
  const { t } = useLanguage();
  const [compose, setCompose] = useState('');
  const [etapes, setEtapes] = useState(null); // null = pas encore de session
  const [saisie, setSaisie] = useState('');
  const scrollRef = useRef(null);

  const styles = getStyles(colors);
  const sessionOuverte = etapes !== null;
  const ecran = sessionOuverte ? resoudreEcranUssd(etapes) : null;
  const sessionTerminee = ecran?.type === 'END';

  function appuyerTouche(touche) {
    if (!sessionOuverte) {
      setCompose((v) => v + touche);
      return;
    }
    if (sessionTerminee) return;
    setSaisie((v) => v + touche);
  }

  function appeler() {
    if (compose.replace(/\s/g, '') !== CODE_COURT) return;
    setEtapes([]);
    setSaisie('');
  }

  function envoyerSaisie() {
    if (!saisie || sessionTerminee) return;
    setEtapes((prev) => [...prev, saisie]);
    setSaisie('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  }

  function raccrocher() {
    setEtapes(null);
    setSaisie('');
    setCompose('');
  }

  const texteEcran = ecran ? sansAccents(ecran.texte) : '';
  const nbCaracteres = texteEcran.length;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('ussd_title')}
        subtitle={t('ussd_subtitle')}
        onBack={() => navigation.goBack()}
      />

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { fontSize: rf(13) }]}>
          Aucune connexion internet, aucun smartphone. Le parent compose{' '}
          <Text style={styles.codeInline}>{CODE_COURT}</Text> et accède au même
          contenu que l'application.
        </Text>

        {/* --- Le combiné --- */}
        <View style={styles.phone}>
          <View
            style={styles.phoneScreen}
            accessibilityLiveRegion="polite"
            accessibilityLabel={
              sessionOuverte
                ? t('ussd_screen_a11y', { texte: texteEcran })
                : t('ussd_dialer_a11y', { compose: compose || '—' })
            }
          >
            {!sessionOuverte ? (
              <>
                <Text style={[styles.phoneDial, { fontSize: rf(24) }]}>
                  {compose || CODE_COURT}
                </Text>
                <Text style={[styles.phoneHint, { fontSize: rf(11) }]}>
                  {compose === CODE_COURT
                    ? t('ivr_press_call')
                    : t('ussd_dial', { code: CODE_COURT })}
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.phoneText, { fontSize: rf(13) }]}>
                  {texteEcran}
                </Text>
                {!sessionTerminee && (
                  <View style={styles.replyRow}>
                    <Text style={[styles.replyLabel, { fontSize: rf(11) }]}>
                      {t('ussd_answer')}
                    </Text>
                    <Text style={[styles.replyValue, { fontSize: rf(14) }]}>
                      {saisie || '_'}
                    </Text>
                  </View>
                )}
                {sessionTerminee && (
                  <Text style={[styles.sessionEnd, { fontSize: rf(11) }]}>
                    {t('ussd_session_over')}
                  </Text>
                )}
              </>
            )}
          </View>

          {/* --- Clavier --- */}
          <View style={styles.keypad}>
            {TOUCHES.map((touche) => (
              <Pressable
                key={touche}
                style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
                onPress={() => appuyerTouche(touche)}
                disabled={sessionTerminee}
                accessibilityRole="button"
                accessibilityLabel={t('ussd_key', { touche })}
              >
                <Text style={[styles.keyText, { fontSize: rf(19) }]}>{touche}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionRow}>
            {!sessionOuverte ? (
              <>
                <Pressable
                  style={[styles.action, styles.actionSecondary]}
                  onPress={() => setCompose((v) => v.slice(0, -1))}
                  accessibilityRole="button"
                  accessibilityLabel={t('ussd_clear_a11y')}
                >
                  <Text style={styles.actionSecondaryText}>{t('ussd_clear')}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.action,
                    styles.actionPrimary,
                    compose !== CODE_COURT && styles.actionDisabled,
                  ]}
                  onPress={appeler}
                  disabled={compose !== CODE_COURT}
                  accessibilityRole="button"
                  accessibilityLabel={t('ussd_call_code', { code: CODE_COURT })}
                  accessibilityState={{ disabled: compose !== CODE_COURT }}
                >
                  <Text style={styles.actionPrimaryText}>{t('ussd_call')}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={[styles.action, styles.actionSecondary]}
                  onPress={raccrocher}
                  accessibilityRole="button"
                  accessibilityLabel={t('ussd_hangup_a11y')}
                >
                  <Text style={styles.actionSecondaryText}>{t('ussd_hangup')}</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.action,
                    styles.actionPrimary,
                    (!saisie || sessionTerminee) && styles.actionDisabled,
                  ]}
                  onPress={envoyerSaisie}
                  disabled={!saisie || sessionTerminee}
                  accessibilityRole="button"
                  accessibilityLabel={t('ussd_send_a11y')}
                  accessibilityState={{ disabled: !saisie || sessionTerminee }}
                >
                  <Text style={styles.actionPrimaryText}>{t('ussd_send')}</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* --- Bandeau technique : la contrainte réelle du canal --- */}
        {sessionOuverte && (
          <View style={styles.techBar}>
            <Text style={[styles.techText, { fontSize: rf(11) }]}>
              {ecran.type} · {nbCaracteres}/{LIMITE_CARACTERES_USSD} caractères
            </Text>
            <Text style={[styles.techHint, { fontSize: rf(10) }]}>
              {ecran.type === 'CON'
                ? t('ussd_con_hint')
                : t('ussd_end_hint')}
            </Text>
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { fontSize: rf(11) }]}>
            Parcours simulé fidèlement, alimenté par le contenu réel des 8 modules.
            Le raccordement à un opérateur pour une mise en production est chiffré
            au budget et prévu en phase d'incubation.
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
    codeInline: { fontWeight: '800', color: colors.accent },

    phone: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: 14,
      borderWidth: contraste ? 2 : 1,
      borderColor: colors.border,
    },
    phoneScreen: {
      backgroundColor: contraste ? '#000000' : '#0d2b18',
      borderRadius: 10,
      padding: 14,
      minHeight: 148,
      justifyContent: 'center',
      borderWidth: contraste ? 2 : 0,
      borderColor: colors.border,
    },
    phoneDial: {
      color: '#8ff0a4',
      fontWeight: '700',
      textAlign: 'center',
      letterSpacing: 2,
    },
    phoneHint: { color: '#5ea77a', textAlign: 'center', marginTop: 8 },
    phoneText: { color: '#8ff0a4', lineHeight: 20 },
    replyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 14,
      borderTopWidth: 1,
      borderTopColor: 'rgba(143,240,164,0.25)',
      paddingTop: 10,
    },
    replyLabel: { color: '#5ea77a' },
    replyValue: { color: '#8ff0a4', fontWeight: '700', letterSpacing: 2 },
    sessionEnd: { color: '#5ea77a', marginTop: 14, textAlign: 'center' },

    keypad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 14,
      rowGap: 8,
    },
    key: {
      width: '31%',
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      alignItems: 'center',
      borderWidth: contraste ? 1 : 0,
      borderColor: colors.border,
    },
    keyPressed: { opacity: 0.6 },
    keyText: { fontWeight: '700', color: colors.textPrimary },

    actionRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
    action: {
      flex: 1,
      paddingVertical: 13,
      borderRadius: 12,
      alignItems: 'center',
    },
    actionPrimary: { backgroundColor: colors.accent },
    actionPrimaryText: { color: colors.accentText, fontWeight: '700', fontSize: 15 },
    actionSecondary: { borderWidth: 2, borderColor: colors.accent },
    actionSecondaryText: { color: colors.accent, fontWeight: '700', fontSize: 15 },
    actionDisabled: { opacity: 0.45 },

    techBar: {
      marginTop: 14,
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      padding: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.accent,
    },
    techText: { color: colors.textPrimary, fontWeight: '700' },
    techHint: { color: colors.textSecondary, marginTop: 4, lineHeight: 15 },

    disclaimer: {
      marginTop: 14,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    disclaimerText: { color: colors.textMuted, lineHeight: 16 },
  });
}
