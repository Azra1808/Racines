# Plan de qualité et registre de preuve

## Décision de sortie

Une version est **présentable** seulement si tous les scénarios P0 sont validés, si aucun défaut critique ouvert n'existe et si chaque résultat porte une preuve datée. « Non exécuté » n'est pas « réussi ».

## Environnement à noter sur chaque preuve

- Application : commit Git, version Expo et APK/build.
- Appareil : modèle, Android/iOS, taille d'écran, langue système.
- Réseau : connecté / mode avion / réseau faible simulé.
- Accessibilité : TalkBack ou VoiceOver, taille de police, contraste élevé.
- Preuve : capture, capture vidéo ou identifiant de ticket.

## Matrice de recette

| ID | Priorité | Scénario | Résultat attendu | Statut initial | Preuve à joindre |
| --- | --- | --- | --- | --- | --- |
| P0-01 | P0 | Lancer l'application après installation | Accueil lisible, aucune erreur bloquante | À exécuter | Vidéo de lancement + appareil |
| P0-02 | P0 | Ouvrir chaque module depuis le catalogue | Les 8 modules s'ouvrent avec contenu cohérent | À exécuter | 8 captures ou parcours vidéo |
| P0-03 | P0 | Passer en mode avion, relancer, lire un module | Contenu embarqué et catalogue utilisables sans réseau | À exécuter | Capture du mode avion + parcours |
| P0-04 | P0 | Terminer un quiz avec dernière réponse correcte | Score et progression incluent la dernière réponse | À exécuter | Capture résultat + état après retour |
| P0-05 | P0 | Écouter, puis relancer une autre lecture | Une seule lecture active ; arrêt/reprise compréhensibles | À exécuter | Vidéo Android réel |
| P0-06 | P0 | Poser à Lulu une question connue | Réponse et module suggéré correspondent au corpus | À exécuter | Capture de conversation |
| P0-07 | P0 | Écrire un signal de danger défini | Alerte claire, pas de conseil médical, aucune fausse promesse | À exécuter | Capture de conversation |
| P0-08 | P0 | Activer contraste élevé sur chaque écran | Texte et actions restent lisibles et utilisables | À exécuter | Captures avant/après |
| P0-09 | P0 | Parcourir accueil, catalogue, quiz et Lulu avec TalkBack/VoiceOver | Rôles, noms, états et retours de résultat annoncés | À exécuter | Capture vidéo avec lecteur d'écran |
| P0-10 | P0 | Ouvrir le tableau de bord local | Toutes les valeurs sont marquées comme démonstration, interactions fonctionnent | À exécuter | Capture navigateur + action alerte |
| P1-01 | P1 | Augmenter la taille de police à 200 % | Pas de texte essentiel tronqué ; actions atteignables | À exécuter | Captures écran étroit |
| P1-02 | P1 | Saisir une question Lulu avec clavier ouvert | Champ et envoi restent visibles et accessibles | À exécuter | Vidéo courte |
| P1-03 | P1 | Fermer/réouvrir l'application après progression | Progression SQLite restaurée | À exécuter | Avant/après relance |
| P1-04 | P1 | Tester les boutons avec appui répété | Pas de doublon de navigation ni de crash | À exécuter | Vidéo + journal si échec |

## Journal d'exécution

| ID | Date | Exécutant | Environnement | Résultat | Défaut / lien preuve |
| --- | --- | --- | --- | --- | --- |
| À compléter |  |  |  | Réussi / Échoué / Bloqué |  |

## Triage des défauts

- **P0** : empêche la démonstration, compromet la sécurité ou donne un résultat faux. Corriger avant présentation.
- **P1** : dégrade fortement la compréhension, l'accessibilité ou la confiance. Corriger avant pilote.
- **P2** : amélioration non bloquante. Documenter et planifier.

## Contrôle final de la veille

1. Installer une build propre sur un téléphone sans environnement de développement.
2. Rejouer P0-01 à P0-10, dont le mode avion et Lulu urgence.
3. Vérifier que toutes les captures utilisent des données fictives et aucun visage/enfant sans autorisation.
4. Préparer une vidéo locale de secours et le tableau de bord hors ligne.
