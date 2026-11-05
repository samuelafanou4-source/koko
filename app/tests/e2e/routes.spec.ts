/**
 * Route inventory smoke test: every page and every API route found in
 * src/app is checked, logged out and logged in with a fresh account.
 * A new route is covered automatically.
 */
import { expect, test } from "@playwright/test";
import { classifyRoute } from "../../src/lib/routes";
import { listApiRoutes, listPageRoutes } from "../support/route-inventory";
import { SECTION_FALLBACK, actAsDistinctClient, expectNoErrorScreen, signUpViaApi } from "./helpers";

const pages = listPageRoutes();
const apis = listApiRoutes();
const privatePages = pages.filter((page) => classifyRoute(page.url) === "private-page");
const privateApis = apis.filter((api) => classifyRoute(api.url) === "private-api");

// Would end the test session or delete the account: covered by flow.spec.ts
const DESTRUCTIVE = new Set(["DELETE /api/auth/delete-data", "DELETE /api/auth/sessions"]);
// Pages restricted by role: a regular account is sent back to its dashboard
const STAFF_ONLY = new Set(["/moderation"]);

test.describe("logged out", () => {
  // Icons, manifest and link preview: public, never sent to /connexion
  for (const [url, type] of [
    ["/favicon.ico", "image/x-icon"],
    ["/icon.svg", "image/svg+xml"],
    ["/icon.png", "image/png"],
    ["/apple-icon.png", "image/png"],
    ["/opengraph-image.png", "image/png"],
    ["/twitter-image.png", "image/png"],
    ["/manifest.json", "application/json"],
    ["/icons/icon-192.png", "image/png"],
    ["/icons/icon-512.png", "image/png"],
    ["/icons/maskable-192.png", "image/png"],
    ["/icons/maskable-512.png", "image/png"],
    ["/icons/monochrome-512.png", "image/png"],
    ["/brand/koko-logo.svg", "image/svg+xml"],
  ] as const) {
    test(`icon ${url}`, async ({ request }) => {
      const res = await request.get(url, { maxRedirects: 0 });
      expect(res.status(), url).toBe(200);
      expect(res.headers()["content-type"], url).toContain(type);
    });
  }

  test("the home page links the Koko icons, manifest and preview image", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const pattern of [
      /<link rel="icon" href="\/favicon\.ico[^"]*" sizes="48x48"/,
      /<link rel="icon" href="\/icon\.svg[^"]*" sizes="any" type="image\/svg\+xml"/,
      /<link rel="apple-touch-icon" href="\/apple-icon\.png[^"]*" sizes="180x180"/,
      /<link rel="manifest" href="\/manifest\.json"/,
      /<meta property="og:image" content="[^"]*\/opengraph-image\.png[^"]*"/,
      /<meta name="twitter:image" content="[^"]*\/twitter-image\.png[^"]*"/,
      /<meta name="apple-mobile-web-app-title" content="Koko"/,
    ]) {
      expect(html).toMatch(pattern);
    }
  });

  for (const page of pages) {
    test(`page ${page.url}`, async ({ request }) => {
      const res = await request.get(page.url, { maxRedirects: 0 });
      if (classifyRoute(page.url) === "public-page") {
        expect(res.status(), page.url).toBe(200);
      } else {
        expect(res.status(), page.url).toBe(307);
        const location = new URL(res.headers()["location"], "http://x");
        expect(location.pathname).toBe("/connexion");
        expect(location.searchParams.get("next")).toBe(page.url);
        expect(res.headers()["cache-control"]).toContain("no-store");
      }
    });
  }

  for (const api of privateApis) {
    for (const method of api.methods) {
      test(`API ${method} ${api.url} → 401`, async ({ request }) => {
        const res = await request.fetch(api.url, { method, data: method === "GET" ? undefined : {} });
        expect(res.status()).toBe(401);
      });
    }
  }

  test("/api/health reports ok on the test databases", async ({ request }) => {
    const res = await request.get("/api/health");
    const body = await res.json();
    expect(body.checks).toEqual({ env: "ok", identityDatabase: "ok", healthDatabase: "ok", encryption: "ok" });
    expect(res.status()).toBe(200);
    // Never a value or a connection string
    expect(JSON.stringify(body)).not.toMatch(/postgres|secret|password/i);
  });
});

test.describe("logged in with a brand-new account (no data at all)", () => {
  test.beforeEach(async ({ context }) => {
    await actAsDistinctClient(context);
  });

  for (const route of privatePages) {
    test(`page ${route.url} renders without error`, async ({ page }) => {
      await signUpViaApi(page.request);
      const response = await page.goto(route.url);
      expect(response?.status(), route.url).toBe(200);
      if (STAFF_ONLY.has(route.url)) {
        await expect(page).toHaveURL(/\/tableau-de-bord$/);
      } else {
        await expect(page).toHaveURL(new RegExp(`${route.url}$`));
      }
      await page.waitForLoadState("networkidle");
      await expectNoErrorScreen(page);
      // Fresh account: empty states only, no section failed to load
      await expect(page.locator("body")).not.toContainText(SECTION_FALLBACK);
    });
  }

  test("every private API answers without a server error", async ({ page }) => {
    await signUpViaApi(page.request);
    for (const api of privateApis) {
      for (const method of api.methods) {
        if (DESTRUCTIVE.has(`${method} ${api.url}`)) continue;
        const res = await page.request.fetch(api.url, { method, data: method === "GET" ? undefined : {} });
        expect(res.status(), `${method} ${api.url}`).toBeLessThan(500);
        expect(res.status(), `${method} ${api.url}`).not.toBe(401);
      }
    }
  });

  test("guest-only pages send her to the dashboard", async ({ page }) => {
    await signUpViaApi(page.request);
    for (const url of ["/", "/connexion", "/onboarding"]) {
      await page.goto(url);
      await expect(page).toHaveURL(/\/tableau-de-bord$/);
    }
  });
});
