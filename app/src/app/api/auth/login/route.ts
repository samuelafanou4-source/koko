import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { identityDb } from "@/lib/db/identity";
import { verifyPassword, startSession } from "@/lib/auth";
import {
  LOGIN_FAILURE_MESSAGE,
  TOO_MANY_ATTEMPTS_MESSAGE,
  consume,
  delayFailure,
  getClientKey,
  getDummyHash,
  isBlocked,
  loginClientLimiter,
  loginPseudonymLimiter,
  pseudonymKey,
} from "@/lib/login-guard";
import { PRIVATE_CACHE_HEADERS } from "@/lib/session";
import { logServerError } from "@/lib/logger";

const loginSchema = z.object({
  pseudonym: z.string().trim().min(1).max(60),
  password: z.string().min(1).max(200),
});

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: PRIVATE_CACHE_HEADERS });
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();

  if (!(await consume(loginClientLimiter, await getClientKey()))) {
    return json({ error: TOO_MANY_ATTEMPTS_MESSAGE }, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Pseudo et mot de passe requis." }, 400);
  }

  const { pseudonym, password } = parsed.data;
  const pseudoKey = pseudonymKey(pseudonym);

  // Same answer whether the pseudonym exists or not
  if (await isBlocked(loginPseudonymLimiter, pseudoKey)) {
    await delayFailure(startedAt);
    return json({ error: TOO_MANY_ATTEMPTS_MESSAGE }, 429);
  }

  try {
    const account = await identityDb.userAccount.findUnique({
      where: { pseudonym },
    });

    // Always run argon2 so that timing does not reveal unknown pseudonyms
    const passwordOk = await verifyPassword(
      account?.passwordHash ?? (await getDummyHash()),
      password
    );

    if (!account || !passwordOk) {
      await consume(loginPseudonymLimiter, pseudoKey);
      await delayFailure(startedAt);
      return json({ error: LOGIN_FAILURE_MESSAGE }, 401);
    }

    await loginPseudonymLimiter.delete(pseudoKey);
    const session = await startSession(account);

    return json({
      success: true,
      user: {
        pseudonym: session.pseudonym,
        anonId: session.anonId,
        role: session.role,
      },
    });
  } catch {
    logServerError("auth.login");
    return json({ error: "Erreur lors de la connexion. Réessaie dans un instant." }, 500);
  }
}
