import { defineConfig } from "vitest/config";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, "$1");

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    // Fast tests only. Database tests: npm run test:db; end-to-end: npm run test:e2e
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", "tests/db/**", "tests/e2e/**", ".next/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(__dirname, "./src/lib/__tests__/mock-server-only.js"),
    },
  },
});
