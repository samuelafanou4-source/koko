import "server-only";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { identityDb } from "@/lib/db/identity";
import { hashPassword, verifyPassword } from "@/lib/passwords";

export { hashPassword, verifyPassword };

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const ACCESS_COOKIE_NAME = "koko_access_session";
export const REFRESH_COOKIE_NAME = "koko_refresh_session";

export interface TokenPayload {
  userId: string;
  anonId: string;
  pseudonym: string;
  role: string;
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
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(getAccessSecret());
}

export async function createRefreshToken(
  userId: string,
  anonId: string
): Promise<string> {
  return new SignJWT({ userId, anonId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<{ userId: string; anonId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return {
      userId: payload.userId as string,
      anonId: payload.anonId as string,
    };
  } catch {
    return null;
  }
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "development";

  cookieStore.set(ACCESS_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60,
  });

  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  return resolveSession();
}

export async function resolveSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  if (access) {
    const payload = await verifyAccessToken(access);
    if (payload) return payload;
  }

  const refresh = cookieStore.get(REFRESH_COOKIE_NAME)?.value;
  if (!refresh) return null;
  return rotateRefreshSession(refresh);
}

export async function rotateRefreshSession(
  refreshToken: string
): Promise<TokenPayload | null> {
  const decoded = await verifyRefreshToken(refreshToken);
  if (!decoded) return null;

  const tokenHash = hashRefreshToken(refreshToken);
  const session = await identityDb.session.findFirst({
    where: {
      userId: decoded.userId,
      refreshTokenHash: tokenHash,
      expiresAt: { gt: new Date() },
    },
  });
  if (!session) return null;

  const account = await identityDb.userAccount.findUnique({
    where: { id: decoded.userId },
  });
  if (!account) return null;

  const payload: TokenPayload = {
    userId: account.id,
    anonId: account.anonId,
    pseudonym: account.pseudonym,
    role: account.role,
  };

  const accessToken = await createAccessToken(payload);
  const newRefresh = await createRefreshToken(account.id, account.anonId);

  await identityDb.$transaction([
    identityDb.session.delete({ where: { id: session.id } }),
    identityDb.session.create({
      data: {
        userId: account.id,
        refreshTokenHash: hashRefreshToken(newRefresh),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  await setAuthCookies(accessToken, newRefresh);
  return payload;
}

export async function persistSession(
  userId: string,
  refreshToken: string
): Promise<void> {
  await identityDb.session.create({
    data: {
      userId,
      refreshTokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
}
