import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma does not read .env when a config file is used: load it here
// (variables already set in the environment win). Disabled in tests.
const envFile = path.join(__dirname, "..", ".env");
if (existsSync(envFile) && !process.env.KOKO_SKIP_DOTENV) process.loadEnvFile(envFile);

// Each schema keeps its own migration history (prisma/migrations/identity).
export default defineConfig({
  schema: path.join(__dirname, "identity.prisma"),
  migrations: { path: path.join(__dirname, "migrations", "identity") },
});
