import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { identityDb } from "@/lib/db/identity";
import { healthDb } from "@/lib/db/health";
import { checkEnv } from "@/lib/env";
import { EncryptionService } from "@/lib/crypto";
import { consume, getClientKey } from "@/lib/login-guard";
import { logServerError } from "@/lib/logger";

export const dynamic = "force-dynamic";

// 10 checks per minute per client: enough for post-deploy scripts
const healthLimiter = new RateLimiterMemory({ keyPrefix: "health", points: 10, duration: 60 });

type Status = "ok" | "ko";
const TIMEOUT_MS = 5_000;

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
  ]);
}

async function probe(name: string, run: () => Promise<unknown>): Promise<Status> {
  try {
    await withTimeout(run());
    return "ok";
  } catch {
    logServerError(`health.${name}`);
    return "ko";
  }
}

function encryptionStatus(): Status {
  try {
    const sample = "koko-health-check";
    const encrypted = EncryptionService.encrypt(sample);
    return EncryptionService.decrypt(encrypted.ciphertext, encrypted.iv, encrypted.authTag) === sample
      ? "ok"
      : "ko";
  } catch {
    return "ko";
  }
}

/**
 * Post-deploy check (npm run smoke). Reports ok/ko per check and the NAMES of
 * misconfigured variables, never a value, a message or a connection string.
 */
export async function GET() {
  if (!(await consume(healthLimiter, await getClientKey()))) {
    return NextResponse.json(
      { status: "ko", error: "Trop de vérifications, réessaie dans une minute." },
      { status: 429, headers: { "Cache-Control": "no-store" } }
    );
  }

  const env = checkEnv();
  const [identityDatabase, healthDatabase] = await Promise.all([
    probe("identity-db", () => identityDb.$queryRaw`SELECT 1`),
    probe("health-db", () => healthDb.$queryRaw`SELECT 1`),
  ]);
  const checks = {
    env: env.every((check) => check.ok) ? ("ok" as Status) : ("ko" as Status),
    identityDatabase,
    healthDatabase,
    encryption: encryptionStatus(),
  };
  const ok = Object.values(checks).every((value) => value === "ok");

  return NextResponse.json(
    {
      status: ok ? "ok" : "ko",
      checks,
      // Names only, so the configuration can be fixed without exposing anything
      invalidEnv: env.filter((check) => !check.ok).map((check) => check.name),
    },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
