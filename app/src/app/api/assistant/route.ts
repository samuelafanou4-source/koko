import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withSession } from "@/lib/session";
import { healthDb } from "@/lib/db/health";
import { EncryptionService } from "@/lib/crypto";
import { assistantLimiter, checkRateLimit } from "@/lib/rate-limit";
import { detectCrisis } from "@/lib/crisis-detector";
import { askKokoAssistant } from "@/lib/gemini";
import { logServerError } from "@/lib/logger";
import { getRateLimitSubject } from "@/lib/rate-subject";

const assistantSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

export const POST = withSession(async (req: NextRequest, user) => {
  const rateLimitKey = await getRateLimitSubject(user.anonId);

  // Rate limiting
  const rateCheck = await checkRateLimit(assistantLimiter, rateLimitKey);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error:
          "Tu poses beaucoup de questions à la fois ! Prends une grande inspiration, Koko sera de nouveau disponible dans quelques secondes.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = assistantSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Message invalide." },
        { status: 400 }
      );
    }

    const { message, history } = parsed.data;

    // 1. Critical Crisis Detection
    const crisis = detectCrisis(message);
    if (crisis.isCrisis) {
      // If user is authenticated, store the crisis event flag (content encrypted)
      if (user?.anonId) {
        const encUser = EncryptionService.encrypt(message);
        const encAssistant = EncryptionService.encrypt(
          crisis.reassuranceMessage || ""
        );

        await healthDb.$transaction([
          healthDb.assistantMessage.create({
            data: {
              anonId: user.anonId,
              role: "user",
              encryptedContent: encUser.ciphertext,
              iv: encUser.iv,
              authTag: encUser.authTag,
              isCrisis: true,
            },
          }),
          healthDb.assistantMessage.create({
            data: {
              anonId: user.anonId,
              role: "assistant",
              encryptedContent: encAssistant.ciphertext,
              iv: encAssistant.iv,
              authTag: encAssistant.authTag,
              isCrisis: true,
            },
          }),
        ]);
      }

      return NextResponse.json({
        content: crisis.reassuranceMessage,
        isCrisis: true,
        category: crisis.category,
        actions: crisis.recommendedActions,
      });
    }

    // 2. Normal Kind AI guidance via Gemini
    const geminiHistory = history.slice(-6).map((h) => ({
      role: (h.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: h.content,
    }));

    const response = await askKokoAssistant(message, geminiHistory);

    // 3. Encrypt and persist history for authenticated user
    if (user?.anonId) {
      const encUser = EncryptionService.encrypt(message);
      const encAssistant = EncryptionService.encrypt(response.content);

      await healthDb.$transaction([
        healthDb.assistantMessage.create({
          data: {
            anonId: user.anonId,
            role: "user",
            encryptedContent: encUser.ciphertext,
            iv: encUser.iv,
            authTag: encUser.authTag,
            isCrisis: false,
          },
        }),
        healthDb.assistantMessage.create({
          data: {
            anonId: user.anonId,
            role: "assistant",
            encryptedContent: encAssistant.ciphertext,
            iv: encAssistant.iv,
            authTag: encAssistant.authTag,
            isCrisis: false,
          },
        }),
      ]);
    }

    return NextResponse.json({
      content: response.content,
      isCrisis: false,
      isFallback: response.isFallback,
    });
  } catch {
    logServerError("assistant");
    return NextResponse.json(
      {
        error:
          "Désolée, Koko a eu un petit souci de connexion. Réessaie dans un instant.",
      },
      { status: 500 }
    );
  }
});

