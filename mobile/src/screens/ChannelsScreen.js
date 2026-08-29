// « Un contenu, cinq portes » — l'écran qui démontre le cœur de l'innovation.
//
// Ce n'est pas une page marketing : chaque encadré affiche le rendu réel,
// calculé en direct depuis la même unité pédagogique. Changez de module en
// haut, les cinq rendus changent ensemble. C'est la preuve, en un écran,
// que le contenu n'est écrit qu'une fois et que chaque canal n'est qu'un
// adaptateur (dossier §5.1).
//
// Les quatre premières portes s'ouvrent : chaque encadré mène vers son
// propre simulateur. La cinquième, la lecture simplifiée, montre son rendu
// directement — les pictogrammes affichés SONT la démonstration.
//
// C'est aussi la réponse visuelle au critère « Replicabilité » : ajouter un
// canal, c'est ajouter un encadré ici — pas réécrire les modules.

import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import UiIcon from '../components/icons/UiIcon';
import PictoIcon from '../components/icons/PictoIcon';
import { useTheme } from '../context/ThemeContext';
import { MODULES } from '../data/modules';
import { resoudreEcranUssd, LIMITE_CARACTERES_USSD, sansAccents } from '../data/ussdMenu';
import { useLanguage } from '../context/LanguageContext';

const LIMITE_SMS = 160;
// Débit moyen d'une synthèse vocale française, mesuré sur les scripts du corpus.
const CARACTERES_PAR_SECONDE = 15;

export default function ChannelsScreen({ navigation }) {
  const { colors, rf } = useTheme();
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const unite = MODULES[index];
  const styles = getStyles(colors);

  const rendus = construireRendus(unite, t);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t('channels_title')}
        subtitle={t('channels_subtitle')}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { fontSize: rf(13) }]}>
          {t('channels_intro_1')}{' '}
          <Text style={styles.fort}>{t('channels_intro_strong')}</Text>
          {t('channels_intro_2')}
        </Text>

        {/* --- Sélecteur de module --- */}
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

        <View style={styles.uniteEntete}>
          <Text style={[styles.uniteTitre, { fontSize: rf(17) }]}>{unite.titre}</Text>
          <Text style={[styles.uniteSource, { fontSize: rf(11) }]}>
            {unite.moduleOrigine}
          </Text>
        </View>

        {rendus.map((rendu) => {
          // Une carte qui mène quelque part est un bouton ; celle qui montre
          // simplement son rendu n'en est pas un. On ne met donc la flèche
          // que là où il y a réellement quelque chose à ouvrir.
          const Conteneur = rendu.action ? Pressable : View;
          const proprietesAction = rendu.action
            ? {
                onPress: () => navigation.navigate(rendu.action.route, rendu.action.params),
                accessibilityRole: 'button',
                accessibilityLabel: rendu.action.libelle,
                style: ({ pressed }) => [styles.carte, pressed && styles.cartePressed],
              }
            : { style: styles.carte };

          return (
            <Conteneur key={rendu.canal} {...proprietesAction}>
              <View style={styles.carteEntete}>
                <View style={styles.carteIconeWrap}>
                  <UiIcon name={rendu.icone} size={18} color={colors.accent} />
                </View>
                <View style={styles.carteTitres}>
                  <Text style={[styles.carteCanal, { fontSize: rf(14) }]}>{rendu.canal}</Text>
                  <Text style={[styles.carteChamp, { fontSize: rf(10) }]}>{rendu.champ}</Text>
                </View>
                <Text style={[styles.carteMesure, { fontSize: rf(10) }]}>{rendu.mesure}</Text>
              </View>

              {rendu.pictos ? (
                <View style={styles.pictoRangee}>
                  {rendu.pictos.map((picto) => (
                    <View key={picto} style={styles.picto}>
                      <PictoIcon name={picto} size={rf(26)} color={colors.textPrimary} />
                      <Text style={[styles.pictoNom, { fontSize: rf(9) }]}>{picto}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={[styles.carteTexte, { fontSize: rf(12) }]}>{rendu.texte}</Text>
              )}

              {rendu.action && (
                <View style={styles.carteAction}>
                  <Text style={styles.carteActionTexte}>{rendu.action.libelle}</Text>
                  <UiIcon name="arrowRight" size={14} color={colors.accent} />
                </View>
              )}
            </Conteneur>
          );
        })}

        <View style={styles.conclusion}>
          <Text style={[styles.conclusionTexte, { fontSize: rf(12) }]}>
            {t('channels_conclusion')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function construireRendus(unite, t) {
  const ecranUssd = sansAccents(resoudreEcranUssd(['2', String(indexDansPage(unite))]).texte);
  const secondes = Math.round(unite.scriptAudioIvr.length / CARACTERES_PAR_SECONDE);

  return [
    {
      canal: t('channel_app'),
      champ: 'corpsApp',
      icone: 'book',
      mesure: `${unite.corpsApp.length} car.`,
      texte: `${unite.corpsApp.slice(0, 220).trimEnd()}…`,
      action: { route: 'Module', params: { moduleId: unite.id }, libelle: t('channel_open_module') },
    },
    {
      canal: t('channel_sms'),
      champ: 'resumeSms',
      icone: 'mail',
      mesure: `${unite.resumeSms.length}/${LIMITE_SMS}`,
      texte: unite.resumeSms,
      action: { route: 'Sms', libelle: t('channel_open_sms') },
    },
    {
      canal: t('channel_ussd'),
      champ: 'resumeSms → écran 182 car.',
      icone: 'noSignal',
      mesure: `${ecranUssd.length}/${LIMITE_CARACTERES_USSD}`,
      texte: ecranUssd,
      action: { route: 'Ussd', libelle: t('channel_open_ussd') },
    },
    {
      canal: t('channel_ivr'),
      champ: 'scriptAudioIvr',
      icone: 'call',
      mesure: `~${secondes} s`,
      texte: unite.scriptAudioIvr,
      action: { route: 'Ivr', libelle: t('channel_open_ivr') },
    },
    {
      // Cinquième porte : la lecture simplifiée, pour un parent qui ne lit
      // pas. Elle n'ouvre pas de simulateur — le rendu EST la démonstration,
      // on voit les pictogrammes réels de l'unité.
      canal: t('channel_simplified'),
      champ: 'pictogrammes',
      icone: 'image',
      mesure: `${unite.pictogrammes.length} pictos`,
      pictos: unite.pictogrammes,
    },
  ];
}

// Le simulateur USSD pagine par 4 : on retrouve la position de l'unité
// dans sa page pour afficher exactement l'écran que verrait le parent.
function indexDansPage(unite) {
  const position = MODULES.findIndex((m) => m.id === unite.id);
  return (position % 4) + 1;
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

    uniteEntete: { marginTop: 16, marginBottom: 12 },
    uniteTitre: { fontWeight: '800', color: colors.textPrimary },
    uniteSource: { color: colors.textMuted, marginTop: 3 },

    carte: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      borderWidth: contraste ? 1 : 0,
      borderColor: colors.border,
      borderLeftWidth: 4,
      borderLeftColor: colors.accent,
    },
    cartePressed: { opacity: 0.85 },
    carteEntete: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    carteIconeWrap: {
      width: 32, height: 32, borderRadius: 9,
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: colors.surfaceAlt,
    },
    carteTitres: { flex: 1 },
    carteCanal: { fontWeight: '800', color: colors.textPrimary },
    carteChamp: { color: colors.textMuted, marginTop: 1 },
    carteMesure: {
      color: colors.textSecondary, fontWeight: '700',
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
    },
    carteTexte: { color: colors.textSecondary, lineHeight: 18 },

    pictoRangee: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    picto: { alignItems: 'center', width: 72 },
    pictoNom: { color: colors.textMuted, textAlign: 'center', marginTop: 4 },

    carteAction: {
      marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6,
    },
    carteActionTexte: { color: colors.accent, fontWeight: '700', fontSize: 13 },

    conclusion: {
      marginTop: 8, padding: 14, borderRadius: 12,
      backgroundColor: colors.surfaceAlt,
    },
    conclusionTexte: { color: colors.textSecondary, lineHeight: 18 },
  });
}
