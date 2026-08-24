# E4 — Design, qualité et communication

Ce dossier transforme la responsabilité E4 en livrables démontrables pour RACINES. Il ne remplace pas les tests terrain : chaque élément qui dépend d'un téléphone réel est tracé dans le plan de QA.

| Livrable | Usage le jour de la démo |
| --- | --- |
| `UX_ACCESSIBILITY_DECISIONS.md` | Expliquer les choix de conception, d'inclusion et les limites assumées. |
| `QA_TEST_PLAN.md` | Exécuter les contrôles, joindre les preuves, décider si la version peut être présentée. |
| `VIDEO_STORYBOARD.md` | Tourner une vidéo de 2 min 45 cohérente, sans promesse non démontrée. |
| `PITCH_10_SLIDES.md` | Répéter un pitch court, factuel et orienté impact. |
| `../dashboard/` | Montrer un poste facilitateur local avec données clairement simulées. |

## Règle de preuve

Ne pas cocher une ligne de QA sans : appareil ou navigateur, version, date, résultat observé et capture/vidéo courte. Les données du tableau de bord sont synthétiques et ne doivent jamais être confondues avec des résultats du pilote.

## Limites produit à dire clairement

La version locale démontre les modules hors connexion, la progression SQLite et l'orientation Lulu. Elle ne démontre pas encore une intégration SMS, USSD ou IVR, ni une collecte terrain réelle. La prochaine étape avant déploiement est donc un pilote encadré, avec consentement, schéma Supabase, règles d'accès et indicateurs validés.
