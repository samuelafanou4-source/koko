/**
 * Database tests on a throwaway PostgreSQL (npm run test:db):
 * - migrations apply cleanly from scratch on both empty databases;
 * - both Prisma clients connect and can read/write;
 * - the health database holds no identity data (hermetic separation).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient as IdentityClient } from "@/generated/identity-client";
import { PrismaClient as HealthClient } from "@/generated/health-client";
import { TEST_DATABASE_URLS, migrateTestDatabases, startTestDatabases } from "../support/test-db";

let stopDatabases: (() => Promise<void>) | undefined;
let identity: IdentityClient;
let health: HealthClient;

beforeAll(async () => {
  ({ stop: stopDatabases } = await startTestDatabases());
  identity = new IdentityClient({ datasources: { db: { url: TEST_DATABASE_URLS.IDENTITY_DATABASE_URL } } });
  health = new HealthClient({ datasources: { db: { url: TEST_DATABASE_URLS.HEALTH_DATABASE_URL } } });
}, 120_000);

afterAll(async () => {
  await identity?.$disconnect();
  await health?.$disconnect();
  await stopDatabases?.();
}, 60_000);

describe("migrations", () => {
  it("apply cleanly from scratch to both empty databases (prisma migrate deploy)", () => {
    const { status, output } = migrateTestDatabases();
    expect(output).not.toMatch(/error/i);
    expect(status).toBe(0);
  }, 180_000);

  it("are idempotent: a second deploy has nothing to apply", () => {
    const { status, output } = migrateTestDatabases();
    expect(status).toBe(0);
    expect(output).toMatch(/No pending migrations to apply/);
  }, 180_000);
});

describe("Prisma clients", () => {
  it("both connect", async () => {
    await expect(identity.$queryRaw`SELECT 1 AS ok`).resolves.toEqual([{ ok: 1 }]);
    await expect(health.$queryRaw`SELECT 1 AS ok`).resolves.toEqual([{ ok: 1 }]);
  });

  it("create an account and its health data, linked only by anonId", async () => {
    const account = await identity.userAccount.create({
      data: { pseudonym: "FleurDeTest", passwordHash: "x", anonId: "anon-test-1" },
    });
    await health.dailyLog.create({
      data: { anonId: account.anonId, date: new Date("2026-01-01"), mood: "calme", symptoms: [] },
    });
    expect(await health.dailyLog.count({ where: { anonId: account.anonId } })).toBe(1);
  });

  it("a brand-new account has empty health data (no crash on empty history)", async () => {
    const empty = await health.cycleEntry.findMany({ where: { anonId: "nobody" } });
    expect(empty).toEqual([]);
  });
});

describe("hermetic separation", () => {
  it("no table of the health database has a column holding identity data", async () => {
    const columns = await health.$queryRaw<{ table_name: string; column_name: string }[]>`
      SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'`;
    expect(columns.length).toBeGreaterThan(0);

    const forbidden = /pseudo|password|encryptedphone|phoneiv|phoneauthtag|userid|refreshtoken/i;
    const leaks = columns.filter(
      (c) =>
        forbidden.test(c.column_name) ||
        // A phone number is only allowed for partner health centres (public data)
        (/phone/i.test(c.column_name) && c.table_name !== "health_centers")
    );
    expect(leaks).toEqual([]);
  });

  it("the health database has no identity tables", async () => {
    const tables = await health.$queryRaw<{ table_name: string }[]>`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    const names = tables.map((t) => t.table_name);
    expect(names).not.toContain("user_accounts");
    expect(names).not.toContain("sessions");
  });
});
