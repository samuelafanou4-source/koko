import "server-only";
import { PrismaClient as IdentityPrismaClient } from "@/generated/identity-client";
import { prepareDatabaseUrl } from "@/lib/db/database-url";

declare global {
  var globalIdentityPrisma: IdentityPrismaClient | undefined;
}

function createIdentityClient(): IdentityPrismaClient {
  const url = prepareDatabaseUrl(process.env.IDENTITY_DATABASE_URL);
  return new IdentityPrismaClient({
    // pgbouncer=true is forced on Supabase transaction-pooler URLs (see database-url.ts)
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    // Never print query arguments (pseudonyms, health data) in error messages
    errorFormat: "minimal",
  });
}

// One client per server instance, also in production (serverless instances
// are reused between requests: a client per request would exhaust connections)
export const identityDb = global.globalIdentityPrisma ?? createIdentityClient();
global.globalIdentityPrisma = identityDb;
