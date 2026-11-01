import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { identityDb } from "@/lib/db/identity";
import {
  hashPassword,
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  persistSession,
} from "@/lib/auth";
import { authLimiter, checkRateLimit } from "@/lib/rate-limit";
import { getRateLimitSubject } from "@/lib/rate-subject";
import { isValidPseudonym } from "@/lib/pseudonyms";
import { EncryptionService } from "@/lib/crypto";
import { logServerError } from "@/lib/logger";

const registerSchema = z.object({
  pseudonym: z.string().min(3).max(30),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // Rate limiting check
  const rateLimit = await checkRateLimit(authLimiter, await getRateLimitSubject());
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Merci de patienter quelques instants." },
      { status: 429 }
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

    // Create session tokens
    const accessToken = await createAccessToken({
      userId: account.id,
      anonId: account.anonId,
      pseudonym: account.pseudonym,
      role: account.role,
    });

    const refreshToken = await createRefreshToken(account.id, account.anonId);

    // Store session record
    await persistSession(account.id, refreshToken);

    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({
      success: true,
      user: {
        pseudonym: account.pseudonym,
        anonId: account.anonId,
        role: account.role,
      },
    });
  } catch {
    logServerError("auth.register");
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de ton espace." },
      { status: 500 }
    );
  }
}

