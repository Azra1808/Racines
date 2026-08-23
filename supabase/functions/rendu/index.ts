import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const canal = url.searchParams.get("canal"); // sms | ivr | app | ussd

  if (!id || !canal) {
    return new Response(
      JSON.stringify({ error: "Paramètres 'id' et 'canal' requis" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: unite, error } = await supabase
    .from("unites_pedagogiques")
    .select("*")
    .eq("id", id)
    .eq("statut_validation", "Validé")
    .single();

  if (error || !unite) {
    return new Response(
      JSON.stringify({ error: "Unité introuvable ou non validée" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  let texte: string;
  switch (canal) {
    case "sms":
      texte = unite.resume_sms;
      break;
    case "ivr":
      texte = unite.script_audio_ivr;
      break;
    case "app":
      texte = unite.corps_app;
      break;
    case "ussd":
      texte = unite.resume_sms.slice(0, 140);
      break;
    default:
      return new Response(
        JSON.stringify({ error: "Canal inconnu : utiliser sms, ivr, app ou ussd" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
  }

  return new Response(
    JSON.stringify({
      id: unite.id,
      titre: unite.titre,
      canal,
      texte,
      pictogrammes: unite.pictogrammes,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});