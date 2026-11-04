import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { identityDb } from "@/lib/db/identity";
import { hashPassword, startSession } from "@/lib/auth";
import {
  TOO_MANY_ATTEMPTS_MESSAGE,
  consume,
  getClientKey,
  registerClientLimiter,
} from "@/lib/login-guard";
import { PRIVATE_CACHE_HEADERS } from "@/lib/session";
import { isValidPseudonym } from "@/lib/pseudonyms";
import { EncryptionService } from "@/lib/crypto";
import { logServerError } from "@/lib/logger";

const registerSchema = z.object({
  pseudonym: z.string().min(3).max(30),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Strict per-client limit: sign-up also tells whether a pseudonym is taken,
  // so it must not be usable to enumerate pseudonyms in bulk
  if (!(await consume(registerClientLimiter, await getClientKey()))) {
    return NextResponse.json(
      { error: TOO_MANY_ATTEMPTS_MESSAGE },
      { status: 429, headers: PRIVATE_CACHE_HEADERS }
    );
  }

  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    const { pseudonym, password, phone } = parsed.data;

    // Pseudonym security check
    const pseudoValidation = isValidPseudonym(pseudonym);
    if (!pseudoValidation.valid) {
      return NextResponse.json(
        { error: pseudoValidation.message },
        { status: 400 }
      );
    }

    // Check if pseudonym already exists
    const existing = await identityDb.userAccount.findUnique({
      where: { pseudonym },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ce pseudonyme est déjà emprunté. Choisis-en un autre avec douceur." },
        { status: 409 }
      );
    }

    // Hash password with Argon2
    const passwordHash = await hashPassword(password);
    const anonId = crypto.randomUUID();

    // Create identity account
    const encPhone = phone ? EncryptionService.encrypt(phone) : null;

    const account = await identityDb.userAccount.create({
      data: {
        pseudonym,
        passwordHash,
        anonId,
        role: "USER",
        encryptedPhone: encPhone?.ciphertext,
        phoneIv: encPhone?.iv,
        phoneAuthTag: encPhone?.authTag,
      },
    });

    // Logged in right away
    await startSession(account);

    return NextResponse.json({
      success: true,
      user: {
        pseudonym: account.pseudonym,
        anonId: account.anonId,
        role: account.role,
      },
    }, { headers: PRIVATE_CACHE_HEADERS });
  } catch (error) {
    // Two sign-ups racing for the same pseudonym: unique constraint
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json(
        { error: "Ce pseudonyme est déjà emprunté. Choisis-en un autre avec douceur." },
        { status: 409 }
      );
    }
    logServerError("auth.register");
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de ton espace." },
      { status: 500 }
    );
  }
}

