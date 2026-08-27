// mobile/src/config/supabase.js
//
// Clé "anon" Supabase : publique par conception (protégée par les règles
// Row Level Security côté serveur, cf. supabase/migrations). Elle peut être
// commitée sans risque, contrairement à la clé "service_role".
// Trouvable dans : Dashboard Supabase → Project Settings → API.

export const SUPABASE_URL = 'https://bhxfuquthgsdjwuarsgp.supabase.co';

export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeGZ1cXV0aGdzZGp3dWFyc2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTkyNDYsImV4cCI6MjEwMjYzNTI0Nn0.y7lsowS_ler-QN8qDZntA-XUwW7HjN60NcyNjn2UJe4';

export const LULU_PARENT_URL = `${SUPABASE_URL}/functions/v1/lulu-parent`;
