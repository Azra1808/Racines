# Décisions UX, accessibilité et éthique

## Intention de service

RACINES ne remplace ni les soignants ni les services d'urgence. C'est un compagnon d'apprentissage parental : des contenus courts, relisibles hors connexion, orientés vers un module précis et faciles à utiliser sur un téléphone modeste.

## Trois situations de conception

| Situation | Besoin réel | Réponse produit | Vérification attendue |
| --- | --- | --- | --- |
| Parent avec peu de données | Retrouver une réponse même sans réseau | Modules embarqués, progression SQLite locale, contenu sans vidéo obligatoire | Démarrage après passage en mode avion et reprise de progression |
| Parent qui préfère écouter | Comprendre sans lecture longue | Bouton « Écouter », progression de lecture et arrêt avant une nouvelle lecture | Français audible sur Android réel ; bouton arrêt et reprise contrôlés |
| Parent inquiet | Savoir quoi faire, sans fausse assurance | Lulu oriente vers un module ; les signaux critiques affichent une alerte et renvoient vers un professionnel/service d'urgence proche | Scénarios d'urgence, ton non culpabilisant, aucune réponse médicale prescriptive |

## Principes UI

1. Une action principale par écran : découvrir, écouter, répondre ou envoyer.
2. Des libellés compréhensibles en français ; les pictogrammes n'assurent jamais seuls le sens.
3. Le contraste élevé reste disponible sur tous les écrans ; les couleurs ne sont pas le seul signal de correction du quiz.
4. Les parcours essentiels ont des intitulés et rôles d'accessibilité : retour, changement de contraste, cartes, réponses du quiz, audio, Lulu et envoi.
5. Le tableau de bord de démonstration montre explicitement « Données de démonstration » et n'utilise aucune donnée personnelle.

## Langage responsable de Lulu

- Lulu dit ce qu'il sait faire : orienter vers le contenu RACINES.
- Lors d'un signal de danger, Lulu privilégie la sécurité immédiate et l'orientation vers un centre de santé ou un service d'urgence proche.
- Lulu ne diagnostique pas, ne prescrit pas et ne collecte pas d'identité.
- Toute extension avec IA générative doit avoir une revue clinique locale, un protocole d'escalade, une journalisation minimale et une politique de consentement.

## Critères d'acceptation d'accessibilité

- Les actions clés sont accessibles au lecteur d'écran avec rôle, nom et indication utiles.
- Le quiz annonce le retour de réponse et l'état sélectionné ; le résultat ne dépend pas seulement du vert ou du rouge.
- La barre de lecture annonce une valeur de progression.
- Lulu annonce les réponses ; une urgence est annoncée de manière prioritaire.
- La mise en page reste utilisable à 200 % de taille de police, avec clavier ouvert et sur largeur étroite.

Ces critères sont des critères de sortie : ils doivent être confirmés dans `QA_TEST_PLAN.md`, sur appareils réels, avant toute soumission finale.
