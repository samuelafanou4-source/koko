import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

const RATE_COOKIE = "koko_rl_token";

/**
 * Rate-limit key that never uses or stores an IP address.
 */
export async function getRateLimitSubject(anonId?: string | null): Promise<string> {
  if (anonId) return `user:${anonId}`;

  const store = await cookies();
  let token = store.get(RATE_COOKIE)?.value;
  if (!token) {
    token = crypto.randomUUID();
    store.set(RATE_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
  return `anon:${token}`;
}
