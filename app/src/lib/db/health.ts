import "server-only";
import { PrismaClient as HealthPrismaClient } from "@/generated/health-client";

declare global {
  var globalHealthPrisma: HealthPrismaClient | undefined;
}

export const healthDb =
  global.globalHealthPrisma ??
  new HealthPrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.globalHealthPrisma = healthDb;
}

