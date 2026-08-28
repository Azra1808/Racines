import { supabase } from './supabaseClient';
import { MODULES as MODULES_LOCAL } from './modules';

const TIMEOUT_MS = 4000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

/**
 * Retourne toujours une liste de modules utilisable.
 * Tente Supabase avec un délai court ; en cas d'échec (pas de réseau,
 * timeout, erreur serveur), retombe silencieusement sur le contenu local
 * embarqué — jamais d'erreur visible pour l'utilisateur.
 */
export async function getModulesAvecSync() {
  if (!supabase) {
    return { modules: MODULES_LOCAL, source: 'local' };
  }

  try {
    const { data, error } = await withTimeout(
      supabase.from('unites_pedagogiques').select('*').eq('statut_validation', 'Validé'),
      TIMEOUT_MS
    );

    if (error || !data || data.length === 0) {
      return { modules: MODULES_LOCAL, source: 'local' };
    }

    const modulesDistants = data.map((row) => ({
      id: row.id,
      moduleOrigine: row.module_origine,
      titre: row.titre,
      thematique: row.thematique,
      statutValidation: row.statut_validation,
      version: row.version,
      resumeSms: row.resume_sms,
      scriptAudioIvr: row.script_audio_ivr,
      corpsApp: row.corps_app,
      pictogrammes: row.pictogrammes ?? [],
      quiz: findQuizLocalPourModule(row.id),
    }));

    return { modules: modulesDistants, source: 'distant' };
  } catch {
    return { modules: MODULES_LOCAL, source: 'local' };
  }
}

function findQuizLocalPourModule(moduleId) {
  const local = MODULES_LOCAL.find((m) => m.id === moduleId);
  return local?.quiz ?? [];
}