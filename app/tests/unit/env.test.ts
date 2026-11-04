import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { checkEnv, getEnv } from "@/lib/env";
import { prepareDatabaseUrl } from "@/lib/db/database-url";

const APP_DIR = path.resolve(__dirname, "..", "..");

const VALID_ENV = {
  NODE_ENV: "test",
  APP_URL: "https://koko.example",
  IDENTITY_DATABASE_URL: "postgresql://u:p@db.example:6543/postgres",
  HEALTH_DATABASE_URL: "postgresql://u:p@db.example:6543/postgres",
  JWT_ACCESS_SECRET: "a".repeat(64),
  JWT_REFRESH_SECRET: "r".repeat(64),
  ENCRYPTION_KEY: Buffer.alloc(32, 7).toString("base64"),
  CRON_SECRET: "c".repeat(32),
} as unknown as NodeJS.ProcessEnv;

describe("env validation (fail fast, clear message)", () => {
  it("accepts a complete configuration", () => {
    expect(() => getEnv(VALID_ENV)).not.toThrow();
    expect(checkEnv(VALID_ENV).every((check) => check.ok)).toBe(true);
  });

  it.each([
    "IDENTITY_DATABASE_URL",
    "HEALTH_DATABASE_URL",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "ENCRYPTION_KEY",
    "CRON_SECRET",
  ])("names %s when it is missing", (name) => {
    const env = { ...VALID_ENV, [name]: undefined };
    expect(() => getEnv(env)).toThrow(name);
    expect(checkEnv(env).find((check) => check.name === name)?.ok).toBe(false);
  });

  it("rejects a database URL that is not postgresql://", () => {
    const env = { ...VALID_ENV, HEALTH_DATABASE_URL: "mysql://u:p@h/db" };
    expect(() => getEnv(env)).toThrow("HEALTH_DATABASE_URL doit être une URL postgresql");
  });

  it("rejects too-short secrets and a malformed APP_URL", () => {
    expect(() => getEnv({ ...VALID_ENV, JWT_ACCESS_SECRET: "short" })).toThrow("JWT_ACCESS_SECRET");
    expect(() => getEnv({ ...VALID_ENV, APP_URL: "koko-tg.vercel.app" })).toThrow("APP_URL");
  });

  it("never echoes a secret value in the error message", () => {
    const leaked = "super-secret-value-that-is-too-short";
    try {
      getEnv({ ...VALID_ENV, JWT_REFRESH_SECRET: "tiny", CRON_SECRET: leaked.slice(0, 5) });
      throw new Error("should have thrown");
    } catch (error) {
      expect(String(error)).not.toContain("tiny");
      expect(String(error)).not.toContain(leaked.slice(0, 5));
    }
  });
});

describe("Supabase transaction pooler (root cause of the dashboard crash)", () => {
  it("adds pgbouncer=true on port 6543 so Prisma does not reuse prepared statements", () => {
    const url = new URL(prepareDatabaseUrl("postgresql://u:p@aws-1.pooler.supabase.com:6543/postgres")!);
    expect(url.searchParams.get("pgbouncer")).toBe("true");
  });

  it("keeps the other parameters and does not duplicate pgbouncer", () => {
    const url = new URL(
      prepareDatabaseUrl("postgresql://u:p@h:6543/postgres?sslmode=require&pgbouncer=true")!
    );
    expect(url.searchParams.getAll("pgbouncer")).toEqual(["true"]);
    expect(url.searchParams.get("sslmode")).toBe("require");
  });

  it("leaves direct and session-pooler URLs (port 5432) untouched", () => {
    const raw = "postgresql://u:p@db.example.supabase.co:5432/postgres";
    expect(prepareDatabaseUrl(raw)).toBe(raw);
    expect(prepareDatabaseUrl(undefined)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------

function listFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (["node_modules", "generated", ".next", "__tests__"].includes(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) listFiles(full, out);
    else if (/\.(ts|tsx|mts|js|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Set by the platform (Node, Next.js, Vercel, CI) or by the test tooling, not app configuration. */
const PLATFORM_VARS = new Set([
  "NODE_ENV", "NEXT_RUNTIME", "VERCEL", "VERCEL_ENV", "VERCEL_URL", "CI", "PORT",
  // Test tooling (scripts/e2e.ts, scripts/smoke.ts, tests/support)
  "KOKO_SKIP_DOTENV", "KOKO_TEST_DB_PORT", "E2E_PORT", "E2E_BASE_URL", "SMOKE_URL",
]);

describe(".env.example documents every variable the code reads", () => {
  it("has no undocumented variable", () => {
    const sources = [
      ...listFiles(path.join(APP_DIR, "src")),
      ...listFiles(path.join(APP_DIR, "scripts")),
      ...listFiles(path.join(APP_DIR, "prisma")),
      path.join(APP_DIR, "next.config.ts"),
    ];
    const used = new Set<string>();
    for (const file of sources) {
      const code = readFileSync(file, "utf8");
      for (const match of code.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) used.add(match[1]);
      for (const match of code.matchAll(/process\.env\[\s*["']([A-Z][A-Z0-9_]*)["']\s*\]/g)) used.add(match[1]);
      // Names read dynamically (process.env[name])
      for (const match of code.matchAll(/["']([A-Z][A-Z0-9]*_(?:DATABASE_URL|DIRECT_URL))["']/g)) used.add(match[1]);
    }
    for (const match of readFileSync(path.join(APP_DIR, "prisma", "identity.prisma"), "utf8").matchAll(/env\("([A-Z0-9_]+)"\)/g)) used.add(match[1]);
    for (const match of readFileSync(path.join(APP_DIR, "prisma", "health.prisma"), "utf8").matchAll(/env\("([A-Z0-9_]+)"\)/g)) used.add(match[1]);

    const documented = new Set(
      readFileSync(path.join(APP_DIR, ".env.example"), "utf8")
        .split(/\r?\n/)
        .map((line) => line.match(/^([A-Z][A-Z0-9_]*)=/)?.[1])
        .filter((name): name is string => Boolean(name))
    );

    const missing = [...used].filter((name) => !PLATFORM_VARS.has(name) && !documented.has(name));
    expect(missing, `Variables lues dans le code mais absentes de .env.example : ${missing.join(", ")}`).toEqual([]);
    // Sanity: the scan really found the main variables
    expect(used).toContain("JWT_ACCESS_SECRET");
    expect(used).toContain("IDENTITY_DIRECT_URL");
  });
});
