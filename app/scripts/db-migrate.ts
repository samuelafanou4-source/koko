/**
 * Prisma migrations for Koko's two databases (identity + health).
 *
 *   npm run db:deploy             apply pending migrations to both databases
 *   npm run db:status             show the migration status of both databases
 *   npm run db:baseline           mark 0_init as already applied (databases
 *                                 created earlier with `prisma db push`)
 *
 * URL used for each database, in order of preference:
 *   IDENTITY_DIRECT_URL / HEALTH_DIRECT_URL   (direct or session-pooler URL)
 *   IDENTITY_DATABASE_URL / HEALTH_DATABASE_URL
 * Migrations must not go through Supabase's transaction pooler (port 6543).
 *
 * Variables come from the environment, else from .env. Values are never printed.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

type Action = "deploy" | "status" | "baseline";
const action = (process.argv[2] ?? "deploy") as Action;
if (!["deploy", "status", "baseline"].includes(action)) {
  console.error(`Action inconnue : ${action} (deploy | status | baseline)`);
  process.exit(2);
}

const envFile = path.resolve(process.cwd(), ".env");
if (existsSync(envFile) && !process.env.KOKO_SKIP_DOTENV) {
  // Variables already set (CI, shell) win over .env
  process.loadEnvFile(envFile);
}

const databases = [
  { name: "identity", url: "IDENTITY_DATABASE_URL", direct: "IDENTITY_DIRECT_URL" },
  { name: "health", url: "HEALTH_DATABASE_URL", direct: "HEALTH_DIRECT_URL" },
] as const;

let failed = false;
for (const db of databases) {
  const url = process.env[db.direct] || process.env[db.url];
  if (!url) {
    console.error(`✖ [${db.name}] ${db.url} (ou ${db.direct}) est manquante.`);
    failed = true;
    continue;
  }
  let port = "";
  try {
    port = new URL(url).port;
  } catch {
    console.error(`✖ [${db.name}] l'URL de ${process.env[db.direct] ? db.direct : db.url} est invalide.`);
    failed = true;
    continue;
  }
  if (port === "6543") {
    console.warn(
      `⚠ [${db.name}] port 6543 = pooler « transaction » Supabase : les migrations peuvent échouer. ` +
        `Définis ${db.direct} (connexion directe ou pooler « session », port 5432).`
    );
  }

  const config = path.join("prisma", `${db.name}.config.ts`);
  const args =
    action === "baseline"
      ? ["prisma", "migrate", "resolve", "--applied", "0_init", "--config", config]
      : ["prisma", "migrate", action, "--config", config];

  console.log(`→ [${db.name}] prisma migrate ${action === "baseline" ? "resolve --applied 0_init" : action}`);
  const result = spawnSync("npx", args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, [db.url]: url },
  });
  if (result.status !== 0) failed = true;
}

process.exit(failed ? 1 : 0);
