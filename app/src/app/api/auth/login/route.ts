import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { identityDb } from "@/lib/db/identity";
import {
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  persistSession,
} from "@/lib/auth";
import { authLimiter, checkRateLimit } from "@/lib/rate-limit";
import { getRateLimitSubject } from "@/lib/rate-subject";
import { logServerError } from "@/lib/logger";

const loginSchema = z.object({
  pseudonym: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const rateLimit = await checkRateLimit(authLimiter, await getRateLimitSubject());
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Merci de patienter quelques instants." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Pseudonyme et mot de passe requis." },
        { status: 400 }
      );
    }

    const { pseudonym, password } = parsed.data;

    const account = await identityDb.userAccount.findUnique({
      where: { pseudonym },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Pseudonyme ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    const validPassword = await verifyPassword(account.passwordHash, password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Pseudonyme ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    const accessToken = await createAccessToken({
      userId: account.id,
      anonId: account.anonId,
      pseudonym: account.pseudonym,
      role: account.role,
    });

    const refreshToken = await createRefreshToken(account.id, account.anonId);

    // Save active session
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
    logServerError("auth.login");
    return NextResponse.json(
      { error: "Erreur lors de la connexion." },
      { status: 500 }
    );
  }
}

