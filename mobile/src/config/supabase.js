// mobile/src/config/supabase.js
//
// Clé "anon" Supabase : publique par conception (protégée par les règles
// Row Level Security côté serveur, cf. supabase/migrations). Elle peut être
// commitée sans risque, contrairement à la clé "service_role".
// Trouvable dans : Dashboard Supabase → Project Settings → API.

export const SUPABASE_URL = 'https://bhxfuquthgsdjwuarsgp.supabase.co';

// ⚠️ À remplacer par la vraie clé anon avant de tester sur téléphone.
export const SUPABASE_ANON_KEY = 'COLLER_ICI_LA_CLE_ANON_PUBLIQUE';

export const LULU_PARENT_URL = `${SUPABASE_URL}/functions/v1/lulu-parent`;
