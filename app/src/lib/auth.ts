import "server-only";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { identityDb } from "@/lib/db/identity";
import { hashPassword, verifyPassword } from "@/lib/passwords";

export { hashPassword, verifyPassword };

// Short-lived access token; the refresh token renews it transparently.
const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
// After a rotation the previous refresh token stays usable this long, so that
// parallel requests sent with the old cookie do not log her out.
export const REFRESH_GRACE_SECONDS = 60;

export const ACCESS_COOKIE_NAME = "koko_access_session";
export const REFRESH_COOKIE_NAME = "koko_refresh_session";

export interface TokenPayload {
  userId: string;
  anonId: string;
  pseudonym: string;
  role: string;
  /** Id of the server-side session row: deleting the row revokes the token. */
  sid: string;
}

function getAccessSecret(): Uint8Array {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is missing");
  }
  return new TextEncoder().encode(secret);
}

function getRefreshSecret(): Uint8Array {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is missing");
  }
  return new TextEncoder().encode(secret);
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAccessToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_TTL_SECONDS}s`)
    .sign(getAccessSecret());
}

export async function createRefreshToken(
  userId: string,
  anonId: string
): Promise<string> {
  return new SignJWT({ userId, anonId })
    .setProtectedHeader({ alg: "HS256" })
    // Unique even when two tokens are issued in the same second
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_TOKEN_TTL_SECONDS}s`)
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret(), {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.userId !== "string" ||
      typeof payload.anonId !== "string" ||
      typeof payload.pseudonym !== "string" ||
      typeof payload.role !== "string" ||
      // Tokens issued before session ids existed are refused: the refresh
      // token then issues a new one, transparently.
      typeof payload.sid !== "string"
    ) {
      return null;
    }
    return {
      userId: payload.userId,
      anonId: payload.anonId,
      pseudonym: payload.pseudonym,
      role: payload.role,
      sid: payload.sid,
    };
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<{ userId: string; anonId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.userId !== "string" || typeof payload.anonId !== "string") {
      return null;
    }
    return { userId: payload.userId, anonId: payload.anonId };
  } catch {
    return null;
  }
}

// httpOnly + secure (in production) + sameSite "lax".
// "lax" and not "strict" on purpose: with "strict", opening Koko from a
// WhatsApp or search link dropped the cookies on that first navigation and
// sent her back to the login page. "lax" still blocks cross-site POST/fetch.
function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE_NAME, accessToken, cookieOptions(ACCESS_TOKEN_TTL_SECONDS));
  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, cookieOptions(REFRESH_TOKEN_TTL_SECONDS));
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

interface AccountLike {
  id: string;
  anonId: string;
  pseudonym: string;
  role: string;
}

/**
 * Opens a new server-side session for an account (login, sign-up, rotation)
 * and sets both cookies. Must be called from a route handler.
 */
export async function startSession(account: AccountLike): Promise<TokenPayload> {
  const refreshToken = await createRefreshToken(account.id, account.anonId);
  const session = await identityDb.session.create({
    data: {
      userId: account.id,
      refreshTokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    },
  });
  const payload: TokenPayload = {
    userId: account.id,
    anonId: account.anonId,
    pseudonym: account.pseudonym,
    role: account.role,
    sid: session.id,
  };
  await setAuthCookies(await createAccessToken(payload), refreshToken);
  return payload;
}

/**
 * Checks an access token against the session table: a logged-out or deleted
 * session is refused even if the JWT has not expired yet. Never writes cookies,
 * so it is safe in server components.
 */
export async function verifySessionToken(
  accessToken: string | undefined
): Promise<TokenPayload | null> {
  if (!accessToken) return null;
  const payload = await verifyAccessToken(accessToken);
  if (!payload) return null;

  const session = await identityDb.session.findFirst({
    where: { id: payload.sid, userId: payload.userId, expiresAt: { gt: new Date() } },
    select: { id: true },
  });
  return session ? payload : null;
}

/**
 * Refresh-token rotation: the presented token is exchanged for a brand new
 * refresh token and access token. The old one stays valid for a short grace
 * period only (parallel requests), then dies. Must run in a route handler.
 */
export async function rotateRefreshSession(
  refreshToken: string
): Promise<TokenPayload | null> {
  const decoded = await verifyRefreshToken(refreshToken);
  if (!decoded) return null;

  const now = new Date();
  const session = await identityDb.session.findFirst({
    where: {
      userId: decoded.userId,
      refreshTokenHash: hashRefreshToken(refreshToken),
      expiresAt: { gt: now },
    },
  });
  if (!session) return null;

  const account = await identityDb.userAccount.findUnique({
    where: { id: decoded.userId },
  });
  if (!account) return null;

  const graceEnd = new Date(now.getTime() + REFRESH_GRACE_SECONDS * 1000);
  await identityDb.session.updateMany({
    where: { id: session.id, expiresAt: { gt: graceEnd } },
    data: { expiresAt: graceEnd },
  });
  // Housekeeping: drop this account's dead sessions
  await identityDb.session.deleteMany({
    where: { userId: account.id, expiresAt: { lte: now } },
  });

  return startSession(account);
}

/** Resolves the user id behind the cookies without rotating anything (logout). */
export async function identifyFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const access = await verifyAccessToken(cookieStore.get(ACCESS_COOKIE_NAME)?.value ?? "");
  if (access) return access.userId;
  const refresh = await verifyRefreshToken(cookieStore.get(REFRESH_COOKIE_NAME)?.value ?? "");
  return refresh?.userId ?? null;
}
