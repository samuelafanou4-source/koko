import { z } from "zod";

/**
 * Every environment variable Koko reads. Documented in .env.example
 * (a test fails if a variable is read in the code but not documented).
 * Messages name the variable, never its value.
 */

function isPostgresUrl(value: string): boolean {
  try {
    return /^postgres(ql)?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
}

const postgresUrl = (name: string) =>
  z
    .string({ message: `${name} est manquante` })
    .min(1, `${name} est manquante`)
    .refine(isPostgresUrl, `${name} doit être une URL postgresql://…`);

const optionalPostgresUrl = (name: string) =>
  z
    .string()
    .optional()
    .refine((value) => !value || isPostgresUrl(value), `${name} doit être une URL postgresql://…`);

const secret = (name: string, min: number) =>
  z
    .string({ message: `${name} est manquante` })
    .min(min, `${name} doit faire au moins ${min} caractères`);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z
    .string()
    .url("APP_URL doit être une URL complète (https://…)")
    .default("http://localhost:3000"),

  IDENTITY_DATABASE_URL: postgresUrl("IDENTITY_DATABASE_URL"),
  HEALTH_DATABASE_URL: postgresUrl("HEALTH_DATABASE_URL"),
  // Migrations only (npm run db:deploy): direct or session-pooler URL
  IDENTITY_DIRECT_URL: optionalPostgresUrl("IDENTITY_DIRECT_URL"),
  HEALTH_DIRECT_URL: optionalPostgresUrl("HEALTH_DIRECT_URL"),

  JWT_ACCESS_SECRET: secret("JWT_ACCESS_SECRET", 32),
  JWT_REFRESH_SECRET: secret("JWT_REFRESH_SECRET", 32),
  ENCRYPTION_KEY: secret("ENCRYPTION_KEY", 16),
  CRON_SECRET: secret("CRON_SECRET", 16),

  GEMINI_API_KEY: z.string().optional().default(""),
  WHATSAPP_ENABLED: z
    .string()
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  WHATSAPP_TOKEN: z.string().optional().default(""),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(""),
  WHATSAPP_VERIFY_TOKEN: z.string().optional().default(""),

  // Tolerant on purpose: an invalid value falls back to 15 (see inactivity.ts)
  INACTIVITY_TIMEOUT_MINUTES: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export interface EnvCheck {
  name: string;
  ok: boolean;
  /** Safe message: names the variable, never shows its value. */
  problem?: string;
}

/** Variables that must be set for Koko to work. */
export const REQUIRED_ENV_VARS = [
  "IDENTITY_DATABASE_URL",
  "HEALTH_DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "ENCRYPTION_KEY",
  "CRON_SECRET",
] as const;

/** Validates without throwing: one entry per required (or invalid) variable. */
export function checkEnv(source: NodeJS.ProcessEnv = process.env): EnvCheck[] {
  const parsed = envSchema.safeParse(source);
  const problems = new Map<string, string>();
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const name = String(issue.path[0] ?? "?");
      if (!problems.has(name)) problems.set(name, issue.message);
    }
  }
  const names = new Set<string>([...REQUIRED_ENV_VARS, ...problems.keys()]);
  return [...names].map((name) =>
    problems.has(name) ? { name, ok: false, problem: problems.get(name) } : { name, ok: true }
  );
}

export function formatEnvErrors(checks: EnvCheck[]): string {
  const failing = checks.filter((check) => !check.ok);
  return (
    `Variables d'environnement manquantes ou invalides : ${failing
      .map((check) => check.problem)
      .join(" ; ")}. ` +
    "En local : complète app/.env à partir de .env.example. Sur Vercel : Project > Settings > Environment Variables."
  );
}

let cached: Env | null = null;

/** Validated configuration; throws a clear French error naming each bad variable. */
export function getEnv(source: NodeJS.ProcessEnv = process.env): Env {
  if (cached && source === process.env) return cached;
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(formatEnvErrors(checkEnv(source)));
  }
  if (source === process.env) cached = parsed.data;
  return parsed.data;
}
