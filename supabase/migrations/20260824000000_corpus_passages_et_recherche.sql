-- RACINES — T-015 : indexation du corpus + T-031 : recherche documentaire
-- Corrige deux incompatibilités du brouillon initial avant exécution :
--   1. unites_pedagogiques.id est de type text (ex. 'U01'), pas uuid.
--   2. La table réelle n'a pas de colonne page_reference séparée : la page
--      est incluse dans module_origine (ex. "Module 1 — ... (p.16-24)").
--      On l'extrait automatiquement par expression régulière plutôt que de
--      redemander une saisie.
--
-- À exécuter dans Supabase : SQL Editor → New query → coller tout → Run.
-- Idempotent : peut être relancé sans erreur si une exécution précédente
-- a échoué en cours de route.

-- ============================================================
-- 1. Table des passages indexés
-- ============================================================
create table if not exists public.corpus_passages (
  id uuid primary key default gen_random_uuid(),
  unite_id text references public.unites_pedagogiques(id),
  module_origine text,
  page_reference text,
  contenu text not null,
  langue text default 'fr',
  tsv tsvector generated always as (to_tsvector('french', contenu)) stored,
  created_at timestamptz default now()
);

create index if not exists corpus_passages_tsv_idx
  on public.corpus_passages using gin(tsv);

create index if not exists corpus_passages_unite_idx
  on public.corpus_passages (unite_id);

alter table public.corpus_passages enable row level security;

drop policy if exists "Lecture publique des passages" on public.corpus_passages;
create policy "Lecture publique des passages"
  on public.corpus_passages for select
  using (true);

-- ============================================================
-- 2. Découpage automatique du contenu déjà en base (8 unités validées)
--    en paragraphes, avec extraction de la référence de page.
-- ============================================================

-- Repart de zéro si ce script a déjà été partiellement exécuté avant le
-- correctif, pour éviter les doublons.
delete from public.corpus_passages;

insert into public.corpus_passages (unite_id, module_origine, page_reference, contenu, langue)
select
  u.id,
  u.module_origine,
  -- Extrait "p.16-24" (ou équivalent) depuis le texte libre de module_origine.
  substring(u.module_origine from 'p\.\s*[0-9][0-9\-–]*'),
  trim(p.paragraphe),
  coalesce(u.langue, 'fr')
from public.unites_pedagogiques u,
  lateral regexp_split_to_table(u.corps_app, E'\n\n+') as p(paragraphe)
where u.statut_validation = 'Validé'
  and length(trim(p.paragraphe)) > 40;

-- Vérification attendue : plusieurs dizaines de lignes (2 à 4 paragraphes
-- par unité x 8 unités validées).
-- select count(*) from public.corpus_passages;

-- ============================================================
-- 3. Fonction de recherche plein texte — cœur de Lulu Parent (T-031)
--    Choix assumé : pas d'embeddings vectoriels (pas de clé API externe,
--    coût zéro, suffisant pour un corpus d'une centaine de passages).
--    Amélioration possible en incubation si le corpus grandit beaucoup.
-- ============================================================
create or replace function public.rechercher_passages(requete text, limite int default 3)
returns table(
  id uuid,
  unite_id text,
  module_origine text,
  page_reference text,
  contenu text,
  pertinence real
)
language sql stable as $$
  select id, unite_id, module_origine, page_reference, contenu,
         ts_rank(tsv, plainto_tsquery('french', requete)) as pertinence
  from public.corpus_passages
  where tsv @@ plainto_tsquery('french', requete)
  order by pertinence desc
  limit limite;
$$;

-- Test rapide après exécution :
-- select * from rechercher_passages('mon bébé ne dort pas la nuit');

-- ============================================================
-- 4. Formulations de test (T-014) — utiles pour T-031/T-033/T-034 et
--    réutilisées telles quelles pour la recette T-054.
--    Table séparée, ne modifie aucune table existante.
-- ============================================================
create table if not exists public.formulations_test (
  id serial primary key,
  type text not null check (type in ('courante', 'detresse')),
  theme text,
  texte text not null
);

alter table public.formulations_test enable row level security;

drop policy if exists "Lecture publique des formulations de test" on public.formulations_test;
create policy "Lecture publique des formulations de test"
  on public.formulations_test for select
  using (true);

-- Rechargement propre si déjà partiellement peuplé.
truncate table public.formulations_test restart identity;

insert into public.formulations_test (type, theme, texte) values
('courante', 'Sommeil', 'Mon bébé ne dort pas la nuit, je suis épuisée, qu''est-ce que je peux faire ?'),
('courante', 'Sommeil', 'Il se réveille toutes les deux heures depuis des semaines, c''est normal ?'),
('courante', 'Sommeil', 'Comment je fais pour qu''il dorme seul dans sa chambre ?'),
('courante', 'Alimentation', 'Mon enfant refuse de manger des légumes, je fais comment ?'),
('courante', 'Alimentation', 'Il a 8 mois, je peux commencer à lui donner autre chose que le lait ?'),
('courante', 'Alimentation', 'Elle mange trop peu, je dois m''inquiéter ?'),
('courante', 'Pleurs et colères', 'Il pleure sans arrêt et je ne sais plus quoi faire.'),
('courante', 'Pleurs et colères', 'Elle fait des crises de colère dès qu''on lui dit non.'),
('courante', 'Pleurs et colères', 'Comment calmer un enfant qui hurle en public ?'),
('courante', 'Discipline positive', 'Est-ce que je peux le corriger fermement s''il n''écoute pas ?'),
('courante', 'Discipline positive', 'Il me désobéit tout le temps, quelles limites poser ?'),
('courante', 'Discipline positive', 'Comment punir sans crier ni frapper ?'),
('courante', 'Développement du langage', 'Mon fils de 2 ans ne parle presque pas, c''est grave ?'),
('courante', 'Développement du langage', 'Comment l''aider à mieux parler ?'),
('courante', 'Allaitement', 'J''ai peur de ne pas avoir assez de lait pour mon bébé.'),
('courante', 'Allaitement', 'Jusqu''à quel âge je dois allaiter ?'),
('courante', 'Écrans', 'Il passe tout son temps sur le téléphone, comment limiter ça ?'),
('courante', 'Fratrie / jalousie', 'Le grand est jaloux depuis la naissance du petit, que faire ?'),
('courante', 'Propreté', 'Comment apprendre le pot à ma fille de 2 ans ?'),
('courante', 'Éducation générale', 'Comment être un bon parent quand on travaille toute la journée ?'),
('courante', 'Éducation générale', 'Je me sens dépassée, je n''ai personne pour m''aider avec les enfants.'),
('courante', 'Éducation générale', 'Comment parler à mon ado qui ne me dit plus rien ?'),
('courante', 'Éducation générale', 'Mon enfant a peur de l''école, comment le rassurer ?'),
('courante', 'Éducation générale', 'Il mouille encore son lit à 6 ans, c''est inquiétant ?'),
('courante', 'Éducation générale', 'Comment gérer un enfant hyperactif à la maison ?'),
('courante', 'Éducation générale', 'Elle ne veut pas partager ses jouets avec les autres enfants.'),
('courante', 'Éducation générale', 'Mon bébé fait ses dents et pleure beaucoup, que faire ?'),
('courante', 'Éducation générale', 'Comment expliquer la mort d''un proche à un enfant de 4 ans ?'),
('courante', 'Éducation générale', 'Il refuse d''aller à l''école le matin, je fais comment ?'),
('courante', 'Éducation générale', 'Comment gérer les disputes entre mes deux enfants ?'),
('detresse', 'Violence conjugale', 'Mon mari me bat devant les enfants, je ne sais plus quoi faire.'),
('detresse', 'Détresse psychologique parent', 'J''ai des idées noires, parfois je me demande si je suis capable de faire du mal à mon bébé tellement je suis fatiguée.'),
('detresse', 'Mariage précoce', 'On veut marier ma fille de 14 ans, je n''arrive pas à m''y opposer.'),
('detresse', 'Précarité / négligence', 'Je n''ai plus d''argent pour nourrir mes enfants correctement.'),
('detresse', 'Travail des enfants', 'Mon fils de 10 ans travaille au lieu d''aller à l''école, on n''a pas le choix.'),
('detresse', 'Abus sexuel', 'Je crois que ma fille a été touchée par quelqu''un de la famille.'),
('detresse', 'Violence physique', 'Je frappe mes enfants plus fort que je le voudrais, je n''arrive plus à me contrôler.'),
('detresse', 'Détresse psychologique parent', 'Depuis l''accouchement je me sens vide, je n''arrive plus à m''occuper d''elle.'),
('detresse', 'Isolement / surcharge', 'Personne ne m''aide, je suis seule avec quatre enfants et je craque.'),
('detresse', 'Négligence médicale', 'Mon mari a interdit à notre fils d''aller à l''hôpital même malade.');
