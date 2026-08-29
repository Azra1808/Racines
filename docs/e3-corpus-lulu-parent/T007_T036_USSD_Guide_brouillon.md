# T-007 + T-036 + T-037 — Simulateur USSD et menu à 4 entrées (E3)

## Étape 1 — Créer le compte simulateur (T-007), gratuit, sans carte bancaire

1. Va sur **https://account.africastalking.com/** (agrégateur panafricain, couvre le Cameroun, palier "Sandbox" gratuit à vie).
2. Crée un compte, choisis l'espace de travail **Sandbox** (pas "Live/Production" — c'est celui gratuit pour les tests).
3. Dans le menu de gauche : **USSD** → un code court simulé est déjà fourni en sandbox (ex. `*384*XXXX#`, le XXXX est généré automatiquement).
4. Note ce code, il sert de preuve (capture d'écran demandée).
5. Vérifie la couverture Cameroun : dans les paramètres du compte, la sandbox fonctionne indépendamment du pays réel — c'est un simulateur, donc pas de restriction géographique à ce stade. La vraie négociation opérateur camerounais est explicitement hors périmètre MVP (voir backlog, W1) et prévue en incubation.
6. Preuve attendue pour T-007 : capture d'écran du dashboard avec le code court actif.

## Étape 2 — Configurer le lien vers votre backend (Callback URL)

Dans **Sandbox → USSD → votre canal**, il y a un champ "Callback URL". C'est l'adresse que Africa's Talking appelle à chaque étape du menu. Elle doit pointer vers une nouvelle Edge Function Supabase, par exemple :
```
https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/ussd-menu
```
(Cette fonction n'existe pas encore — code ci-dessous, à déployer par toi/Michou/Krys depuis un ordinateur avec la CLI Supabase.)

## Étape 3 — Code du menu à 4 entrées (T-036)

Squelette TypeScript pour une Edge Function Supabase (`supabase/functions/ussd-menu/index.ts`) :

```typescript
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const form = await req.formData();
  const text = String(form.get("text") ?? "");
  const phoneNumber = String(form.get("phoneNumber") ?? "");

  const steps = text.split("*").filter(Boolean);
  let response = "";

  if (steps.length === 0) {
    // Écran d'accueil
    response =
      "CON Bienvenue sur RACINES\n" +
      "1. Conseil du jour\n" +
      "2. Rappel de session\n" +
      "3. Quiz\n" +
      "4. Inscription";
  } else if (steps[0] === "1") {
    // Appelle votre API de contenu existante, filtrée pour le canal USSD
    const conseil = await fetch(
      "https://bhxfuquthgsdjwuarsgp.supabase.co/functions/v1/contenu?canal=ussd&type=conseil_du_jour"
    ).then((r) => r.json());
    response = `END ${conseil.texte ?? "Conseil indisponible pour le moment."}`;
  } else if (steps[0] === "2") {
    response = "END Rappel programmé. Nous vous contacterons pour votre prochaine session.";
  } else if (steps[0] === "3") {
    if (steps.length === 1) {
      response = "CON Question 1 : Un bébé doit-il dormir sur le dos ?\n1. Oui\n2. Non";
    } else {
      const correct = steps[1] === "1";
      response = `END ${correct ? "Bonne réponse !" : "Pas tout à fait, la réponse est : Oui."}`;
    }
  } else if (steps[0] === "4") {
    response = "END Inscription enregistrée. Merci de votre confiance.";
  } else {
    response = "END Option invalide.";
  }

  return new Response(response, { headers: { "Content-Type": "text/plain" } });
});
```

Points clés du protocole Africa's Talking (à respecter, sinon le menu casse) :
- Répondre avec le préfixe `CON` = l'échange continue (le parent voit un nouvel écran et peut encore taper).
- Répondre avec le préfixe `END` = fin de session.
- `text` accumule tous les choix séparés par `*` depuis le début de la session (ex. `3*1` = "Quiz" puis "Oui").

## Étape 4 — Tester (T-037)

1. Dans le dashboard Africa's Talking : **Sandbox → Simulator**, entre le code court et un numéro de téléphone factice.
2. Déroule les 4 branches du menu (conseil, rappel, quiz, inscription) jusqu'au bout.
3. Filme l'écran du simulateur pendant le parcours complet → c'est la preuve attendue.

## Répartition pratique vu tes contraintes

- Ce que **tu** peux faire depuis ton téléphone dès maintenant : créer le compte (étape 1), configurer la callback URL une fois la fonction déployée (étape 2), tester sur le simulateur web (étape 4).
- Ce qui nécessite un ordinateur : déployer le code de l'étape 3 (`supabase functions deploy ussd-menu`). Si Michou ou Krys peuvent s'en charger dans la journée, dis-le-moi et je rédige les instructions CLI exactes pour eux, dans le même style que le guide déjà fait pour Michel.

## Ce qu'il reste (Sprint 2, pas urgent aujourd'hui)

- T-048/T-049 (IVR) et T-075 (SMS) : on les prend demain une fois que corpus + USSD sont validés. Dis-moi si tu préfères qu'on les prépare en parallèle dès aujourd'hui.
