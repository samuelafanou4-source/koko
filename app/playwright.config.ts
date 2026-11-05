import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests. Run them with `npm run test:e2e`, which starts the test
 * databases and the production server first (scripts/e2e.ts).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  // A stuck run fails after 15 minutes instead of hanging
  globalTimeout: 15 * 60_000,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3100",
    trace: "retain-on-failure",
    locale: "fr-FR",
    // globals.css scrolls smoothly; while it scrolls, Playwright clicks land
    // on whatever passes under the pointer (flaky). Reduced motion turns it off.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    { name: "mobile-360", use: { ...devices["Pixel 5"], viewport: { width: 360, height: 760 } } },
  ],
});
