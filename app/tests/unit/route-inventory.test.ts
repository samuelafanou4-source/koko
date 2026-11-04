/**
 * Every page and API route is discovered automatically; each must be either
 * public by design (explicit list) or protected server-side. A route added
 * without protection fails here before reaching production.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { classifyRoute, PUBLIC_API_ROUTES, PUBLIC_PAGES } from "@/lib/routes";
import { listApiRoutes, listPageRoutes } from "../support/route-inventory";

const pages = listPageRoutes();
const apis = listApiRoutes();

describe("route inventory", () => {
  it("finds every known page and API route", () => {
    const urls = pages.map((page) => page.url);
    for (const expected of ["/", "/tableau-de-bord", "/assistant-koko", "/carnet-intime", "/le-cercle", "/pass-sante", "/parametres", "/moderation", "/connexion", "/onboarding", "/sos-ecoute"]) {
      expect(urls).toContain(expected);
    }
    expect(apis.map((api) => api.url)).toContain("/api/cycle");
    expect(apis.every((api) => api.methods.length > 0)).toBe(true);
  });

  it("every public page is in PUBLIC_PAGES and in the (public) group", () => {
    for (const page of pages.filter((p) => classifyRoute(p.url) === "public-page")) {
      expect(PUBLIC_PAGES as readonly string[], page.url).toContain(page.url);
      expect(page.group, page.url).toBe("(public)");
    }
  });

  describe.each(pages.filter((p) => classifyRoute(p.url) === "private-page").map((p) => [p.url, p] as const))(
    "private page %s",
    (_url, page) => {
      it("lives in the (platform) group (layout runs requireSession)", () => {
        expect(page.group).toBe("(platform)");
      });

      it("calls requireSession() itself (layouts do not re-run on client navigation)", () => {
        expect(readFileSync(page.file, "utf8")).toMatch(/await requireSession\(/);
      });
    }
  );

  it("every public API route is listed explicitly", () => {
    for (const api of apis.filter((a) => classifyRoute(a.url) === "public-api")) {
      expect(PUBLIC_API_ROUTES as readonly string[]).toContain(api.url);
    }
  });

  describe.each(apis.filter((a) => classifyRoute(a.url) === "private-api").map((a) => [a.url, a] as const))(
    "private API %s",
    (_url, api) => {
      it.each(api.methods)("%s is wrapped in withSession()", (method) => {
        expect(readFileSync(api.file, "utf8")).toMatch(new RegExp(`export const ${method} = withSession\\(`));
      });
    }
  );
});
