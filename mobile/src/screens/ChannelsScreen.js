// « Un contenu, cinq portes » — l'écran qui démontre le cœur de l'innovation.
//
// Ce n'est pas une page marketing : chaque encadré affiche le rendu réel,
// calculé en direct depuis la même unité pédagogique. Changez de module en
// haut, les cinq rendus changent ensemble. C'est la preuve, en un écran, que
// le contenu n'est écrit qu'une fois et que chaque canal n'est qu'un
// adaptateur (dossier §5.1).
//
// C'est aussi la réponse visuelle au critère « Replicabilité » : ajouter un
// canal, c'est ajouter un encadré ici — pas réécrire huit modules.

import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { useTheme } from '../context/ThemeContext';
import { MODULES, PICTO_EMOJI } from '../data/modules';
import { resoudreEcranUssd, LIMITE_CARACTERES_USSD, sansAccents } from '../data/ussdMenu';

const LIMITE_SMS = 160;
// Débit moyen d'une synthèse vocale française, mesuré sur les scripts du corpus.
const CARACTERES_PAR_SECONDE = 15;

export default function ChannelsScreen({ navigation }) {
  const { colors, rf } = useTheme();
  const [index, setIndex] = useState(0);
  const unite = MODULES[index];
  const styles = getStyles(colors);

  const rendus = construireRendus(unite);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Un contenu, cinq portes"
        subtitle="Le même module, rendu pour chaque canal"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.intro, { fontSize: rf(13) }]}>
          Le contenu est écrit <Text style={styles.fort}>une seule fois</Text>.
          Chaque canal en sélectionne les champs dont il a besoin. Changez de
          module : les cinq rendus ci-dessous changent ensemble.
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
              accessibilityLabel={`Module ${i + 1} : ${m.titre}`}
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

        {rendus.map((rendu) => (
          <View key={rendu.canal} style={styles.carte}>
            <View style={styles.carteEntete}>
              <Text style={[styles.carteIcone, { fontSize: rf(17) }]}>{rendu.icone}</Text>
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
                    <Text style={{ fontSize: rf(24) }}>{PICTO_EMOJI[picto] ?? '•'}</Text>
                    <Text style={[styles.pictoNom, { fontSize: rf(9) }]}>{picto}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.carteTexte, { fontSize: rf(12) }]}>{rendu.texte}</Text>
            )}

            {rendu.action && (
              <Pressable
                style={styles.carteAction}
                onPress={() => navigation.navigate(rendu.action.route)}
                accessibilityRole="button"
                accessibilityLabel={rendu.action.libelle}
              >
                <Text style={styles.carteActionTexte}>{rendu.action.libelle} →</Text>
              </Pressable>
            )}
          </View>
        ))}

        <View style={styles.conclusion}>
          <Text style={[styles.conclusionTexte, { fontSize: rf(12) }]}>
            Ajouter un canal, c'est écrire un adaptateur. Ajouter une langue,
            c'est traduire les mêmes champs. Ni l'un ni l'autre ne demande de
            réécrire les modules — c'est ce qui rend l'extension nationale
            soutenable.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function construireRendus(unite) {
  const ecranUssd = sansAccents(resoudreEcranUssd(['2', String(indexDansPage(unite))]).texte);
  const secondes = Math.round(unite.scriptAudioIvr.length / CARACTERES_PAR_SECONDE);

  return [
    {
      canal: 'Application',
      champ: 'corpsApp',
      icone: '📱',
      mesure: `${unite.corpsApp.length} car.`,
      texte: `${unite.corpsApp.slice(0, 220).trimEnd()}…`,
    },
    {
      canal: 'SMS',
      champ: 'resumeSms',
      icone: '💬',
      mesure: `${unite.resumeSms.length}/${LIMITE_SMS}`,
      texte: unite.resumeSms,
    },
    {
      canal: 'USSD',
      champ: 'resumeSms → écran 182 car.',
      icone: '📵',
      mesure: `${ecranUssd.length}/${LIMITE_CARACTERES_USSD}`,
      texte: ecranUssd,
      action: { route: 'Ussd', libelle: 'Ouvrir le simulateur USSD' },
    },
    {
      canal: 'Vocal (IVR)',
      champ: 'scriptAudioIvr',
      icone: '📞',
      mesure: `~${secondes} s`,
      texte: unite.scriptAudioIvr,
      action: { route: 'Ivr', libelle: 'Écouter le parcours vocal' },
    },
    {
      canal: 'Lecture simplifiée',
      champ: 'pictogrammes',
      icone: '🖼️',
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
    carteEntete: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    carteIcone: {},
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
    picto: { alignItems: 'center', width: 66 },
    pictoNom: { color: colors.textMuted, textAlign: 'center', marginTop: 3 },

    carteAction: { marginTop: 10 },
    carteActionTexte: { color: colors.accent, fontWeight: '700', fontSize: 13 },

    conclusion: {
      marginTop: 8, padding: 14, borderRadius: 12,
      backgroundColor: colors.surfaceAlt,
    },
    conclusionTexte: { color: colors.textSecondary, lineHeight: 18 },
  });
}
