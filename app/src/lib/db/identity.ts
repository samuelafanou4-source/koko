import "server-only";
import { PrismaClient as IdentityPrismaClient } from "@/generated/identity-client";

declare global {
  var globalIdentityPrisma: IdentityPrismaClient | undefined;
}

export const identityDb =
  global.globalIdentityPrisma ??
  new IdentityPrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.globalIdentityPrisma = identityDb;
}

