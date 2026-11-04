import { defineConfig } from "vitest/config";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1");

// Database tests: real (throwaway) PostgreSQL, run with `npm run test:db`.
// Standalone on purpose: merging with vitest.config.mts would keep its
// exclusion of tests/db.
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/db/**/*.test.ts"],
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./src/lib/__tests__/mock-server-only.js"),
    },
  },
});
