# T-031 à T-034 — Lulu Parent : corpus, recherche, garde-fous

Statut : implémenté (code prêt), **non déployé** tant que la migration SQL
et la fonction Edge n'ont pas été exécutées/déployées sur le vrai projet
Supabase. Voir « Déploiement » plus bas.

## Ce que fait le pipeline (`supabase/functions/lulu-parent/index.ts`)

Un seul point d'entrée, appelé par tous les canaux (l'application aujourd'hui ;
USSD/SMS demain via le même appel) :

```
POST /functions/v1/lulu-parent
{ "question": "...", "telephone"?: "...", "canal"?: "app" | "ussd" | "sms" | "ivr" }
```

1. **Renvoi médical systématique** (T-032 §garde-fou médical) — mots-clés
   médicaux → orientation vers un professionnel de santé, aucune recherche.
2. **Détection des signaux d'alerte** (T-034) — mots-clés d'alerte → message
   d'orientation + ligne insérée dans `signalements` (table déjà existante,
   schéma `RACINES_Tables_SQL.sql` réutilisé tel quel).
3. **Recherche documentaire** (T-031) — appel de la fonction SQL
   `rechercher_passages`, recherche plein texte PostgreSQL en français
   (`tsvector`/`ts_rank`). Choix assumé : pas d'embeddings vectoriels, donc
   pas de clé API externe ni de coût — suffisant pour ~30-40 passages.
4. **Refus argumenté** (T-033) — si aucun passage suffisamment pertinent
   (seuil `pertinence < 0.01`) → message d'orientation, jamais d'invention.
5. **Génération contrainte + citation** (T-032) — sinon, réponse construite
   uniquement à partir du passage retrouvé, avec `module_origine` et
   `page_reference` renvoyés pour affichage de la source.

Chaque échange est journalisé dans `questions_posees` (`statut_reponse` ∈
`renvoi_medical | alerte | refus | reponse_sourcee`) — cette table sert
aussi de preuve pour T-054 (recette de l'assistant).

## Correctifs apportés au brouillon initial (Mamou)

- `corpus_passages.unite_id` corrigé en `text` (la vraie PK de
  `unites_pedagogiques` est `text`, pas `uuid`).
- Colonnes `module`/`page_reference` remplacées par `module_origine`
  (colonne réelle) ; `page_reference` est maintenant extrait automatiquement
  par expression régulière depuis `module_origine`.
- La table `signalements` proposée à l'origine n'est **pas** recréée : elle
  existe déjà (`RACINES_Tables_SQL.sql`), on écrit dedans avec son vrai
  schéma (`utilisateur_id_anonymise`, `type_alerte`, `canal`,
  `statut_traitement`).
- Les 40 formulations (T-014) sont chargées dans une nouvelle table
  `formulations_test`, réutilisable telle quelle pour T-054.

## Fusion avec le second envoi de Mamou (`T032_034_LuluParent_EdgeFunction.md`)

Mamou a indépendamment produit une version très proche de la fonction Edge
(bon signe de convergence). Les deux versions ont été fusionnées ; là où
elles différaient, voici ce qui a été retenu et pourquoi :

| Point | Choix retenu | Pourquoi |
|---|---|---|
| Mots-clés (médicaux/alerte) | Comparaison insensible aux accents | Les accents sautent souvent en SMS/USSD ; robustesse. |
| Seuil de pertinence (`rechercher_passages`) | `0.05` (valeur de Mamou) | Plus strict que `0.01` : mieux vaut refuser que répondre à côté sur un sujet touchant à l'enfant. À recalibrer après les premiers vrais tests si trop de refus injustifiés. |
| Identifiant appelant | `utilisateur_id` direct (valeur de Mamou), pas de hash téléphone | Cohérent avec le schéma réel de `questions_posees` (FK uuid), plus simple, rien à réinventer. |
| Valeur de `statut_reponse` en cas de succès | `"repondu"` (valeur de Mamou) | Convention à garder identique dans toute l'équipe pour les futures requêtes du tableau de bord. |
| Structure de `source` renvoyée | Objet `{unite_id, module_origine, page_reference}` (garde ma version) | L'écran `LuluScreen.js` en a besoin pour proposer le bouton "Ouvrir le module". Une simple chaîne ne suffit pas. |

Le fichier original de Mamou est conservé tel quel dans ce dossier
(`T032_034_LuluParent_EdgeFunction.md`) pour traçabilité.

## Déploiement — à faire depuis un ordinateur avec la CLI Supabase

```powershell
# Depuis la racine du dépôt, après avoir récupéré cette branche
supabase link --project-ref bhxfuquthgsdjwuarsgp
supabase db push                      # applique la migration (corpus_passages, rechercher_passages, formulations_test)
supabase functions deploy lulu-parent # déploie le pipeline de garde-fous
```

Si la CLI n'est pas installée sur la machine : coller directement le
contenu de `supabase/migrations/20260824000000_corpus_passages_et_recherche.sql`
dans l'éditeur SQL du dashboard Supabase (fonctionne aussi depuis un
navigateur mobile). Le déploiement de la fonction Edge, en revanche,
nécessite la CLI (pas possible depuis un simple navigateur).

## Vérification après déploiement (preuve T-031)

Dans l'éditeur SQL Supabase :
```sql
select count(*) from public.corpus_passages;     -- attendu : plusieurs dizaines de lignes
select * from rechercher_passages('mon bébé ne dort pas la nuit');
```

Test de bout en bout du pipeline complet (une fois la fonction déployée),
depuis n'importe quel terminal ou même un site comme reqbin.com :
```bash
curl -X POST https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/lulu-parent \
  -H "Content-Type: application/json" \
  -H "apikey: VOTRE_CLE_ANON" \
  -d '{"question": "mon bébé ne dort pas la nuit"}'
```

À tester sur les 3 cas de figure (capture attendue pour la recette) :
- Une question courante du corpus formulations_test (`type='courante'`) → `type: "reponse"` avec `source`.
- Une question de détresse (`type='detresse'`) → `type: "alerte"`.
- Une question hors périmètre (ex. « quelle est la capitale du Cameroun ? ») → `type: "refus"`.
- Une question médicale (ex. « mon enfant a de la fièvre ») → `type: "renvoi_medical"`.

## Reste à faire après le déploiement

- Coller la vraie clé anon Supabase dans `mobile/src/config/supabase.js`.
- T-036/T-037 (menu USSD) pourra appeler ce même endpoint pour l'option
  « Question libre » si on l'ajoute au menu (à décider avec E1/E4).
- Enrichir les listes de mots-clés médicaux/alerte avec E1/E4 lors de la
  recette T-054.
