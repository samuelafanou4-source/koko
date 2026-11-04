/**
 * Throwaway PostgreSQL for tests (embedded-postgres: real PostgreSQL
 * binaries, no Docker, no real credentials). Never touches the real databases.
 */
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";

export const TEST_DB_PORT = Number(process.env.KOKO_TEST_DB_PORT ?? 54329);
const USER = "koko_test";
const PASSWORD = "koko_test_only";

export const TEST_DATABASE_URLS = {
  IDENTITY_DATABASE_URL: `postgresql://${USER}:${PASSWORD}@127.0.0.1:${TEST_DB_PORT}/koko_identity_test`,
  HEALTH_DATABASE_URL: `postgresql://${USER}:${PASSWORD}@127.0.0.1:${TEST_DB_PORT}/koko_health_test`,
};

const APP_DIR = path.resolve(__dirname, "..", "..");
const DATA_DIR = path.join(APP_DIR, ".test-db");

export async function startTestDatabases(): Promise<{ stop: () => Promise<void> }> {
  rmSync(DATA_DIR, { recursive: true, force: true });
  const pg = new EmbeddedPostgres({
    databaseDir: DATA_DIR,
    user: USER,
    password: PASSWORD,
    port: TEST_DB_PORT,
    persistent: false,
    // No asynchronous I/O workers: they can outlive the server on Windows
    postgresFlags: ["-c", "io_method=sync"],
    onLog: () => {},
  });
  await pg.initialise();
  await pg.start();
  await pg.createDatabase("koko_identity_test");
  await pg.createDatabase("koko_health_test");
  return {
    stop: async () => {
      await pg.stop();
      rmSync(DATA_DIR, { recursive: true, force: true });
    },
  };
}

/** Applies every migration of both schemas, from scratch (prisma migrate deploy). */
export function migrateTestDatabases(): { status: number; output: string } {
  const result = spawnSync("npx", ["tsx", "scripts/db-migrate.ts", "deploy"], {
    cwd: APP_DIR,
    encoding: "utf8",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      ...TEST_DATABASE_URLS,
      IDENTITY_DIRECT_URL: "",
      HEALTH_DIRECT_URL: "",
      KOKO_SKIP_DOTENV: "1",
    },
  });
  return { status: result.status ?? 1, output: `${result.stdout}\n${result.stderr}` };
}
