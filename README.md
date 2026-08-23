# RACINES

**Enraciner la parentalité positive dans chaque foyer, connecté ou non.**

Solution multicanale (application mobile, USSD, IVR, SMS) pour diffuser le programme national de parentalité positive à l'échelle, y compris auprès des parents sans smartphone ni accès internet.

Projet réalisé dans le cadre du **Concours d'innovation digitale « Parentalité positive »** — MINPROFF / UNICEF Cameroun, édition 2026.

---

## Le problème

Le programme de parentalité positive fonctionne, mais sa portée reste limitée : il repose principalement sur des sessions de formation en présentiel, qui touchent un nombre restreint de parents. RACINES est un multiplicateur de diffusion, pas un nouveau contenu pédagogique — le contenu existe déjà et est validé par le programme national.

## La solution

Un **modèle de contenu central unique**, décliné automatiquement sur cinq portes d'entrée :

| Canal | Ce qu'il apporte |
|---|---|
| **Application mobile** | Catalogue de modules, texte + audio, quiz, progression, fonctionnement intégral hors connexion |
| **USSD** | Menu interactif utilisable sur un téléphone basique, sans internet |
| **IVR (audio)** | Messages vocaux navigables par touches, pour les parents non lettrés ou malvoyants |
| **SMS** | Rappels et notifications passives |
| **Assistant « Lulu Parent »** | Recherche documentaire sur corpus fermé (le guide officiel), réponse toujours sourcée, refus argumenté hors périmètre |

Un seul contenu, jamais dupliqué : ajouter un canal revient à écrire un adaptateur, pas à reproduire le contenu.

## Équipe

| Réf. | Prénom | Rôle | Périmètre |
|---|---|---|---|
| **E1** | Alexia | Produit & Données (chef de projet) | Modèle de contenu, base de données, API, dossier de candidature, budget |
| **E2** | Michel | Mobile & Accessibilité | Application Expo, hors connexion, synchronisation, accessibilité, APK |
| **E3** | Florent | IA & Canaux low-tech | Corpus, assistant IA, USSD, IVR, SMS |
| **E4** | Krys | Agile, Design, Qualité & Communication | UX, tableau de bord web, tests, vidéo, pitch |

## Pile technique

- **Application** : React Native (Expo), base locale embarquée
- **Base de données / Auth / Stockage** : Supabase (PostgreSQL + pgvector)
- **Assistant IA** : recherche documentaire sur corpus fermé, génération contrainte
- **USSD** : simulateur d'agrégateur télécom
- **Tableau de bord** : application web statique, déploiement continu

## Liens (mis à jour au fil du projet)

- APK signé : *à venir*
- Tableau de bord en ligne : *à venir*
- Vidéo de démonstration : *à venir*
- Documentation complète : voir le [Wiki](../../wiki)

## Règles de contribution

- Une branche par fonctionnalité, `main` toujours en état de compiler
- Toute fusion passe par une Pull Request relue par un pair (branche `main` protégée)
- Aucun secret ou clé versionné — utiliser un fichier d'exemple pour les variables d'environnement

## Contexte du concours

Six critères d'évaluation : Innovation, Accessibilité, Impact, Réplicabilité, Coût et durabilité, Pertinence locale, Prise en compte du handicap.

---

*Projet RACINES — Équipe de 4 — Concours Innovation Digitale Parentalité Positive 2026*
