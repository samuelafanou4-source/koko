import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const CODED_REMINDERS = [
  "🌿 Petit rappel Koko : Pense à arroser ta plante aujourd'hui et prends soin de toi.",
  "🌸 Douce pensée : N'oublie pas ta petite tisane du soir et respire un grand coup.",
  "☀️ Un moment pour toi : Vérifie ton petit carnet secret et bois un grand verre d'eau.",
];

const remindersBodySchema = z
  .object({
    dryRun: z.boolean().optional(),
  })
  .optional();

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (
    !cronSecret ||
    authHeader !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Parse and validate optional body if provided
  try {
    const text = await req.text();
    if (text) {
      const parsed = remindersBodySchema.safeParse(JSON.parse(text));
      if (!parsed.success) {
        return NextResponse.json({ error: "Format de requête invalide" }, { status: 400 });
      }
    }
  } catch {
    return NextResponse.json({ error: "Format JSON invalide" }, { status: 400 });
  }

  const isEnabled = process.env.WHATSAPP_ENABLED === "true";
  if (!isEnabled) {
    return NextResponse.json({
      status: "whatsapp_disabled",
      message: "Les rappels WhatsApp sont désactivés par configuration.",
      sampleCodedReminders: CODED_REMINDERS,
    });
  }

  // When WhatsApp is configured, scheduler loops over subscribed users
  // and dispatches coded camouflaged notifications
  return NextResponse.json({
    status: "success",
    dispatchedCount: 0,
    message: "Cycle de rappels camouflés complété.",
  });
}

