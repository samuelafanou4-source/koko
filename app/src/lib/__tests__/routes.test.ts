import { describe, it, expect } from "vitest";
import {
  classifyRoute,
  isGuestOnlyPage,
  isNoIndexRoute,
  isPrivateRoute,
  normalizePathname,
} from "../routes";

describe("normalizePathname", () => {
  it("drops trailing and duplicate slashes", () => {
    expect(normalizePathname("/charte/")).toBe("/charte");
    expect(normalizePathname("//charte//")).toBe("/charte");
    expect(normalizePathname("/")).toBe("/");
  });

  it("decodes percent-escapes, including double encoding", () => {
    expect(normalizePathname("/%61ssistant-koko")).toBe("/assistant-koko");
    expect(normalizePathname("/%2561ssistant-koko")).toBe("/assistant-koko");
  });

  it("resolves dot segments and backslashes", () => {
    expect(normalizePathname("/charte/../carnet-intime")).toBe("/carnet-intime");
    expect(normalizePathname("/charte/%2e%2e/carnet-intime")).toBe("/carnet-intime");
    expect(normalizePathname("/charte\\..\\le-cercle")).toBe("/le-cercle");
  });

  it("ignores the query string and fragment", () => {
    expect(normalizePathname("/connexion?next=/carnet-intime#x")).toBe("/connexion");
  });

  it("returns null for undecodable or control-character paths", () => {
    expect(normalizePathname("/%E0%A4%A")).toBeNull();
    expect(normalizePathname("/charte%00")).toBeNull();
  });
});

describe("classifyRoute: public pages", () => {
  it.each(["/", "/onboarding", "/connexion", "/charte", "/sos-ecoute", "/offline"])(
    "%s is public",
    (path) => {
      expect(classifyRoute(path)).toBe("public-page");
      expect(isPrivateRoute(path)).toBe(false);
    }
  );

  it("accepts trailing slashes and query strings on public pages", () => {
    expect(classifyRoute("/sos-ecoute/")).toBe("public-page");
    expect(classifyRoute("/connexion?next=%2Fcarnet-intime")).toBe("public-page");
  });

  it("keeps /sos-ecoute public even when encoded", () => {
    expect(classifyRoute("/sos%2Decoute")).toBe("public-page");
  });
});

describe("classifyRoute: private pages", () => {
  it.each([
    "/tableau-de-bord",
    "/assistant-koko",
    "/assistant-koko/",
    "/assistant-koko/anything",
    "/assistant-koko/a/b?c=d",
    "/carnet-intime",
    "/le-cercle",
    "/pass-sante",
    "/parametres",
    "/moderation",
  ])("%s is private", (path) => {
    expect(classifyRoute(path)).toBe("private-page");
  });

  it("is default-deny: unknown pages are private", () => {
    expect(classifyRoute("/nouvelle-page")).toBe("private-page");
    expect(classifyRoute("/charte/secret")).toBe("private-page");
    expect(classifyRoute("/connexion/extra")).toBe("private-page");
  });

  it("does not let a public prefix or traversal unlock a private page", () => {
    expect(classifyRoute("/charte/../carnet-intime")).toBe("private-page");
    expect(classifyRoute("/charte/%2e%2e/carnet-intime")).toBe("private-page");
    expect(classifyRoute("/%63arnet-intime")).toBe("private-page");
  });

  it("does not let a fake asset path unlock a private page", () => {
    expect(classifyRoute("/_next/static/../../carnet-intime")).toBe("private-page");
    expect(classifyRoute("/icons/..%2Fle-cercle")).toBe("private-page");
  });

  it("treats undecodable paths as private", () => {
    expect(classifyRoute("/%E0%A4%A")).toBe("private-page");
    expect(classifyRoute("/api/%E0%A4%A")).toBe("private-api");
  });
});

describe("classifyRoute: API", () => {
  it.each([
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/refresh",
    "/api/auth/logout",
    "/api/auth/pseudonyms",
    "/api/auth/me",
    "/api/sos",
    "/api/auth/login/",
  ])("%s is a public API", (path) => {
    expect(classifyRoute(path)).toBe("public-api");
  });

  it.each([
    "/api/assistant",
    "/api/cycle",
    "/api/circle/posts",
    "/api/circle/comments",
    "/api/circle/reactions",
    "/api/circle/moderate",
    "/api/vouchers",
    "/api/health-centers",
    "/api/auth/sessions",
    "/api/auth/delete-data",
    "/api/auth/login/extra",
    "/api/unknown",
    "/api",
  ])("%s is a private API", (path) => {
    expect(classifyRoute(path)).toBe("private-api");
  });
});

describe("classifyRoute: static files", () => {
  it.each([
    "/_next/static/chunks/main.js",
    "/_next/image?url=x",
    "/icons/icon-192.png",
    "/manifest.json",
    "/sw.js",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
  ])("%s is static", (path) => {
    expect(classifyRoute(path)).toBe("static");
  });
});

describe("guest-only pages and indexing", () => {
  it("sends logged-in users away from /, /connexion and /onboarding only", () => {
    expect(isGuestOnlyPage("/")).toBe(true);
    expect(isGuestOnlyPage("/connexion/")).toBe(true);
    expect(isGuestOnlyPage("/onboarding")).toBe(true);
    expect(isGuestOnlyPage("/sos-ecoute")).toBe(false);
    expect(isGuestOnlyPage("/charte")).toBe(false);
  });

  it("indexes only the public presentation pages", () => {
    expect(isNoIndexRoute("/")).toBe(false);
    expect(isNoIndexRoute("/charte")).toBe(false);
    expect(isNoIndexRoute("/connexion")).toBe(true);
    expect(isNoIndexRoute("/onboarding")).toBe(true);
    expect(isNoIndexRoute("/carnet-intime")).toBe(true);
    expect(isNoIndexRoute("/api/cycle")).toBe(true);
  });
});
