import "server-only";
import crypto from "crypto";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { headers } from "next/headers";
import { getRateLimitSubject } from "@/lib/rate-subject";
import { hashPassword } from "@/lib/passwords";

/**
 * Anti brute-force for login and sign-up.
 *
 * - Per client: a keyed hash of the network address, kept in memory only
 *   (never logged, never stored), falling back to the anonymous rate cookie.
 * - Per pseudonym: failed logins only, whether the pseudonym exists or not,
 *   so the lock itself reveals nothing.
 *
 * Note: in-memory counters are per server instance. On Vercel several
 * instances may run in parallel, so these limits are a floor, not a ceiling.
 */

export const LOGIN_FAILURE_MESSAGE = "Pseudo ou mot de passe incorrect.";
export const TOO_MANY_ATTEMPTS_MESSAGE =
  "Trop de tentatives. Patiente quelques minutes avant de réessayer.";

// Any login attempt from one client: 20 per 15 minutes
export const loginClientLimiter = new RateLimiterMemory({
  keyPrefix: "login-client",
  points: 20,
  duration: 15 * 60,
});

// Failed logins on one pseudonym: 5 per 15 minutes
export const loginPseudonymLimiter = new RateLimiterMemory({
  keyPrefix: "login-pseudo",
  points: 5,
  duration: 15 * 60,
});

// Sign-up attempts from one client: 10 per hour (limits pseudonym enumeration)
export const registerClientLimiter = new RateLimiterMemory({
  keyPrefix: "register-client",
  points: 10,
  duration: 60 * 60,
});

const MIN_FAILURE_DELAY_MS = 700;
const FAILURE_JITTER_MS = 200;

function hashKey(value: string): string {
  const pepper = process.env.JWT_REFRESH_SECRET ?? "koko-rate-limit";
  return crypto.createHmac("sha256", pepper).update(value).digest("hex").slice(0, 32);
}

/** Opaque per-client key. The address itself never leaves this function. */
export async function getClientKey(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || headerStore.get("x-real-ip")?.trim();
  if (address) return `net:${hashKey(address)}`;
  return getRateLimitSubject();
}

export function pseudonymKey(pseudonym: string): string {
  return `pseudo:${hashKey(pseudonym.trim().toLowerCase())}`;
}

/** Consumes one point; false when the limit is reached. */
export async function consume(limiter: RateLimiterMemory, key: string): Promise<boolean> {
  try {
    await limiter.consume(key, 1);
    return true;
  } catch {
    return false;
  }
}

/** True if the key has already used all its points (without consuming). */
export async function isBlocked(limiter: RateLimiterMemory, key: string): Promise<boolean> {
  const state = await limiter.get(key);
  return state !== null && state.consumedPoints >= limiter.points;
}

let dummyHash: Promise<string> | null = null;

/** A real argon2 hash to verify against when the pseudonym does not exist. */
export function getDummyHash(): Promise<string> {
  dummyHash ??= hashPassword(crypto.randomBytes(16).toString("hex"));
  return dummyHash;
}

/** Pads a failed attempt to a roughly constant duration. */
export async function delayFailure(startedAt: number): Promise<void> {
  const target = MIN_FAILURE_DELAY_MS + crypto.randomInt(FAILURE_JITTER_MS);
  const remaining = target - (Date.now() - startedAt);
  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
}
