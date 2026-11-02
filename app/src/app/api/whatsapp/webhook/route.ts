import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { askKokoAssistant } from "@/lib/gemini";
import { detectCrisis } from "@/lib/crisis-detector";
import { logServerError } from "@/lib/logger";

const webhookGetSchema = z.object({
  "hub.mode": z.string().optional(),
  "hub.verify_token": z.string().optional(),
  "hub.challenge": z.string().optional(),
});

const webhookPostBodySchema = z.object({
  object: z.string().optional(),
  entry: z.array(z.any()).optional(),
}).passthrough();

/**
 * GET Verification endpoint for Meta WhatsApp Cloud API Webhook
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = webhookGetSchema.safeParse({
    "hub.mode": searchParams.get("hub.mode") ?? undefined,
    "hub.verify_token": searchParams.get("hub.verify_token") ?? undefined,
    "hub.challenge": searchParams.get("hub.challenge") ?? undefined,
  });

  if (!parsed.success) {
    return new Response("Invalid parameters", { status: 400 });
  }

  const mode = parsed.data["hub.mode"];
  const token = parsed.data["hub.verify_token"];
  const challenge = parsed.data["hub.challenge"];

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token === verifyToken) {
    return new Response(challenge || "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

/**
 * POST Webhook for incoming WhatsApp messages
 */
export async function POST(req: NextRequest) {
  const isEnabled = process.env.WHATSAPP_ENABLED === "true";
  if (!isEnabled) {
    return NextResponse.json({ status: "whatsapp_disabled" });
  }

  try {
    const rawBody = await req.json();
    const parsedBody = webhookPostBodySchema.safeParse(rawBody);
    if (!parsedBody.success) {
      return NextResponse.json({ status: "invalid_body" }, { status: 400 });
    }
    const body = parsedBody.data;

    // Extract incoming message if Meta webhook format
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const messageObj = changes?.value?.messages?.[0];

    if (!messageObj || messageObj.type !== "text") {
      return NextResponse.json({ status: "ignored" });
    }

    const from = messageObj.from; // Phone number
    const text = messageObj.text?.body;

    if (!text) {
      return NextResponse.json({ status: "empty" });
    }

    // 1. Check crisis detection
    const crisis = detectCrisis(text);
    let replyText = "";

    if (crisis.isCrisis) {
      // Same numbers as the web app, chosen for this crisis category
      const lines = (crisis.recommendedActions ?? [])
        .filter((a) => a.phone)
        .map((a) => `• ${a.label} : ${a.phone}`)
        .join("\n");
      replyText =
        `${crisis.reassuranceMessage}\n\n` +
        `Pour ton secours immédiat au Togo :\n${lines}`;
    } else {
      // 2. Call Gemini
      const response = await askKokoAssistant(text);
      replyText = response.content;
    }

    // 3. Send response back to WhatsApp recipient if token is configured
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (token && phoneId) {
      await fetch(
        `https://graph.facebook.com/v19.0/${phoneId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: { body: replyText },
          }),
        }
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    logServerError("whatsapp.webhook");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

