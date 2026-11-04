import "server-only";
import { PrismaClient as HealthPrismaClient } from "@/generated/health-client";
import { prepareDatabaseUrl } from "@/lib/db/database-url";

declare global {
  var globalHealthPrisma: HealthPrismaClient | undefined;
}

function createHealthClient(): HealthPrismaClient {
  const url = prepareDatabaseUrl(process.env.HEALTH_DATABASE_URL);
  return new HealthPrismaClient({
    // pgbouncer=true is forced on Supabase transaction-pooler URLs (see database-url.ts)
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    // Never print query arguments (pseudonyms, health data) in error messages
    errorFormat: "minimal",
  });
}

// One client per server instance, also in production (serverless instances
// are reused between requests: a client per request would exhaust connections)
export const healthDb = global.globalHealthPrisma ?? createHealthClient();
global.globalHealthPrisma = healthDb;
