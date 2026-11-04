/**
 * npm run test:e2e: end-to-end tests on the PRODUCTION build, against
 * throwaway test databases (never the real ones).
 *
 * 1. starts an embedded PostgreSQL and applies every migration from scratch
 * 2. npm run build (skip with --no-build)
 * 3. next start with TEST values for every variable of .env.example
 *    (process env overrides .env: no real database, secret or API key is used)
 * 4. playwright test, then everything is stopped and deleted
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { TEST_DATABASE_URLS, migrateTestDatabases, startTestDatabases } from "../tests/support/test-db";

const APP_DIR = path.resolve(__dirname, "..");
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = `http://localhost:${PORT}`;
const isWindows = process.platform === "win32";

/** Test value for every documented variable: nothing falls back to the real .env. */
function testEnvironment(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const line of readFileSync(path.join(APP_DIR, ".env.example"), "utf8").split(/\r?\n/)) {
    const name = line.match(/^([A-Z][A-Z0-9_]*)=/)?.[1];
    if (name) env[name] = "";
  }
  return {
    ...env,
    NODE_ENV: "production",
    APP_URL: BASE_URL,
    ...TEST_DATABASE_URLS,
    IDENTITY_DIRECT_URL: "",
    HEALTH_DIRECT_URL: "",
    JWT_ACCESS_SECRET: crypto.randomBytes(48).toString("hex"),
    JWT_REFRESH_SECRET: crypto.randomBytes(48).toString("hex"),
    ENCRYPTION_KEY: crypto.randomBytes(32).toString("base64"),
    CRON_SECRET: crypto.randomBytes(24).toString("hex"),
    GEMINI_API_KEY: "", // the assistant answers in fallback mode, no external call
    WHATSAPP_ENABLED: "false",
    INACTIVITY_TIMEOUT_MINUTES: "15",
  };
}

function run(command: string, args: string[], env?: NodeJS.ProcessEnv): number {
  const result = spawnSync(command, args, { cwd: APP_DIR, stdio: "inherit", shell: isWindows, env });
  return result.status ?? 1;
}

async function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${url}/charte`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Le serveur de test n'a pas démarré sur ${url}`);
}

function stopServer(server: ChildProcess | undefined) {
  if (!server?.pid) return;
  if (isWindows) spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  else server.kill("SIGTERM");
}

async function main() {
  const skipBuild = process.argv.includes("--no-build");
  const playwrightArgs = process.argv.slice(2).filter((arg) => arg !== "--no-build");
  let exitCode = 1;
  let server: ChildProcess | undefined;
  console.log("→ Bases de test (PostgreSQL embarqué)…");
  const databases = await startTestDatabases();

  try {
    const migration = migrateTestDatabases();
    if (migration.status !== 0) {
      console.error(migration.output);
      throw new Error("Les migrations ont échoué sur les bases de test.");
    }

    if (!skipBuild && run("npm", ["run", "build"]) !== 0) throw new Error("npm run build a échoué.");

    const env = { ...process.env, ...testEnvironment() };
    console.log(`→ next start sur ${BASE_URL} (variables de test)…`);
    server = spawn("node", [path.join("node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], {
      cwd: APP_DIR,
      env,
      stdio: ["ignore", "inherit", "inherit"],
    });
    await waitForServer(BASE_URL);

    exitCode = run("npx", ["playwright", "test", ...playwrightArgs], { ...process.env, E2E_BASE_URL: BASE_URL });
  } catch (error) {
    console.error(`✖ ${error instanceof Error ? error.message : error}`);
  } finally {
    stopServer(server);
    await databases.stop().catch(() => {});
  }
  process.exit(exitCode);
}

void main();
