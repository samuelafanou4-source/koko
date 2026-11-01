import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  IDENTITY_DATABASE_URL: z.string().min(1, "IDENTITY_DATABASE_URL is required"),
  HEALTH_DATABASE_URL: z.string().min(1, "HEALTH_DATABASE_URL is required"),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  ENCRYPTION_KEY: z.string().min(16, "ENCRYPTION_KEY is required"),
  GEMINI_API_KEY: z.string().optional().default(""),
  WHATSAPP_ENABLED: z
    .string()
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  WHATSAPP_TOKEN: z.string().optional().default(""),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(""),
  WHATSAPP_VERIFY_TOKEN: z.string().optional().default(""),
  CRON_SECRET: z.string().min(16, "CRON_SECRET is required"),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new Error(`Missing or invalid environment variables: ${issues}. Fill app/.env from .env.example.`);
  }
  cached = parsed.data;
  return cached;
}
