// Canal SMS — le seul des cinq canaux dont une partie est RÉELLE aujourd'hui.
//
// Le bouton « Envoyer par SMS » ouvre la messagerie du téléphone, pré-remplie
// avec le conseil du module. Le facilitateur envoie depuis sa propre ligne :
// aucun serveur, aucune passerelle, aucun coût pour le programme. C'est le
// geste qu'un relais communautaire fait déjà — rendu instantané et fidèle au
// contenu validé, sans recopie ni déformation.
//
// La diffusion automatique à des milliers de parents, elle, suppose une
// passerelle opérateur facturée au message : hors périmètre du MVP, chiffrée
// au budget, annoncée comme telle en bas d'écran.

import { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Linking, Platform, Alert,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import { useTheme } from '../context/ThemeContext';
import { MODULES } from '../data/modules';
import { composerSms, nombreDeSms, lienSms, LIMITE_SMS } from '../data/smsCanal';
import { useLanguage } from '../context/LanguageContext';

export default function SmsScreen({ navigation }) {
  const { colors, rf } = useTheme();
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const unite = MODULES[index];
  const texte = composerSms(unite);
  const styles = getStyles(colors);

  async function envoyer() {
    const lien = lienSms(texte);
    try {
      const supporte = await Linking.canOpenURL(lien);
      if (!supporte) {
        Alert.alert(
          'Messagerie indisponible',
          "Cet appareil n'a pas d'application de messagerie. Sur un téléphone Android, le conseil s'ouvrirait directement dans les SMS."
        );
        return;
      }
      await Linking.openURL(lien);
    } catch (_e) {
      Alert.alert(
        'Envoi impossible',
        "La messagerie n'a pas pu s'ouvrir. Le conseil reste lisible ci-dessus et peut être recopié."
      );
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('sms_title')}
        subtitle={t('sms_subtitle')}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { fontSize: rf(13) }]}>
          Un facilitateur ouvre un module et l'envoie au parent depuis sa propre
          ligne. Le conseil part <Text style={styles.fort}>tel qu'il a été validé</Text>,
          sans recopie ni déformation.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selecteur}
        >
          {MODULES.map((m, i) => (
            <Pressable
              key={m.id}
              onPress={() => setIndex(i)}
              style={[styles.puce, i === index && styles.puceActive]}
              accessibilityRole="button"
              accessibilityLabel={t('module_select', { n: i + 1, titre: m.titre })}
              accessibilityState={{ selected: i === index }}
            >
              <Text style={[styles.puceTexte, i === index && styles.puceTexteActif]}>
                {i + 1}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* --- Aperçu tel que le parent le recevra --- */}
        <View style={styles.telephone}>
          <Text style={[styles.expediteur, { fontSize: rf(11) }]}>RACINES</Text>
          <View style={styles.bulle}>
            <Text style={[styles.bulleTexte, { fontSize: rf(14) }]}>{texte}</Text>
          </View>
          <Text style={[styles.horodatage, { fontSize: rf(10) }]}>maintenant</Text>
        </View>

        <View style={styles.compteur}>
          <Text style={[styles.compteurTexte, { fontSize: rf(12) }]}>
            {texte.length}/{LIMITE_SMS} caractères · {nombreDeSms(texte)} SMS facturé
            {nombreDeSms(texte) > 1 ? 's' : ''}
          </Text>
          <Text style={[styles.compteurAide, { fontSize: rf(10) }]}>
            Au-delà de {LIMITE_SMS} caractères, l'opérateur découpe le message et
            facture chaque partie. C'est pour cette contrainte que chaque module
            embarque un résumé court.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
          onPress={envoyer}
          accessibilityRole="button"
          accessibilityLabel={t('sms_send_a11y', { titre: unite.titre })}
          accessibilityHint={t('sms_send_hint')}
        >
          <UiIcon name="mail" size={16} color={colors.accentText} />
          <Text style={styles.boutonTexte}>{t('sms_send_cta')}</Text>
        </Pressable>

        {Platform.OS === 'web' && (
          <Text style={[styles.noteWeb, { fontSize: rf(11) }]}>
            Sur navigateur, l'ouverture de la messagerie dépend du système.
            Sur un téléphone Android, ce bouton ouvre directement les SMS.
          </Text>
        )}

        <View style={styles.disclaimer}>
          <Text style={[styles.disclaimerText, { fontSize: rf(11) }]}>
            <Text style={styles.fort}>{t('sms_available_today')}</Text> l'envoi individuel
            par un facilitateur, depuis sa propre ligne, sans aucune infrastructure
            ni coût pour le programme.{'\n\n'}
            <Text style={styles.fort}>{t('sms_incubation')}</Text> la diffusion
            automatique de rappels hebdomadaires à grande échelle, qui suppose un
            raccordement à une passerelle opérateur facturée au message. Le coût
            figure au budget prévisionnel.
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
    intro: { color: colors.textSecondary, lineHeight: 19, marginBottom: 14 },
    fort: { fontWeight: '800', color: colors.accent },

    selecteur: { gap: 8, paddingVertical: 2 },
    puce: {
      width: 38, height: 38, borderRadius: 10,
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1, borderColor: colors.border,
    },
    puceActive: { backgroundColor: colors.accent, borderColor: colors.accent },
    puceTexte: { fontWeight: '700', color: colors.textSecondary },
    puceTexteActif: { color: colors.accentText },

    telephone: {
      marginTop: 18,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 14,
      borderWidth: contraste ? 2 : 1,
      borderColor: colors.border,
    },
    expediteur: {
      color: colors.textMuted, fontWeight: '700',
      letterSpacing: 0.5, marginBottom: 8,
    },
    bulle: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: 14,
      borderBottomLeftRadius: 4,
      padding: 13,
      alignSelf: 'flex-start',
      maxWidth: '92%',
    },
    bulleTexte: { color: colors.textPrimary, lineHeight: 20 },
    horodatage: { color: colors.textMuted, marginTop: 6 },

    compteur: {
      marginTop: 14, padding: 12, borderRadius: 10,
      backgroundColor: colors.surfaceAlt,
      borderLeftWidth: 4, borderLeftColor: colors.accent,
    },
    compteurTexte: { color: colors.textPrimary, fontWeight: '700' },
    compteurAide: { color: colors.textSecondary, marginTop: 4, lineHeight: 15 },

    bouton: {
      marginTop: 16, backgroundColor: colors.accent,
      paddingVertical: 15, borderRadius: 13, flexDirection: 'row',
      alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    boutonPresse: { opacity: 0.85 },
    boutonTexte: { color: colors.accentText, fontWeight: '700', fontSize: 15 },

    noteWeb: { color: colors.textMuted, marginTop: 10, lineHeight: 16 },

    disclaimer: {
      marginTop: 16, padding: 13, borderRadius: 10,
      borderWidth: 1, borderColor: colors.border,
    },
    disclaimerText: { color: colors.textMuted, lineHeight: 17 },
  });
}
