import "server-only";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Login and sign-up limits live in login-guard.ts

// Assistant routes: max 25 queries per minute per anonId
export const assistantLimiter = new RateLimiterMemory({
  points: 25,
  duration: 60,
});

// Circle / forum post creation: max 5 posts per 5 minutes
export const forumLimiter = new RateLimiterMemory({
  points: 5,
  duration: 300,
});

export async function checkRateLimit(
  limiter: RateLimiterMemory,
  key: string
): Promise<{ allowed: boolean; remainingPoints?: number; retryAfter?: number }> {
  try {
    const res = await limiter.consume(key, 1);
    return {
      allowed: true,
      remainingPoints: res.remainingPoints,
    };
  } catch (rej: unknown) {
    const error = rej as { msBeforeNext?: number };
    return {
      allowed: false,
      retryAfter: Math.round((error.msBeforeNext || 1000) / 1000),
    };
  }
}

