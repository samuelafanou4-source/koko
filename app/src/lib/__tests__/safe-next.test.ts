import { describe, it, expect } from "vitest";
import { resolveNextPath, sanitizeNextPath } from "../safe-next";

describe("sanitizeNextPath: accepted", () => {
  it.each([
    ["/carnet-intime", "/carnet-intime"],
    ["/assistant-koko/x", "/assistant-koko/x"],
    ["/le-cercle?category=all", "/le-cercle?category=all"],
    ["/parametres#sessions", "/parametres#sessions"],
    ["/tableau-de-bord", "/tableau-de-bord"],
  ])("%s", (input, expected) => {
    expect(sanitizeNextPath(input)).toBe(expected);
  });
});

describe("sanitizeNextPath: rejected (open redirect and loops)", () => {
  it.each([
    "https://evil.com",
    "http://evil.com/carnet-intime",
    "//evil.com",
    "//evil.com/carnet-intime",
    "///evil.com",
    "/\\evil.com",
    "\\\\evil.com",
    "/\\/evil.com",
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "/%2F%2Fevil.com",
    "/%2f%2fevil.com",
    "/%5Cevil.com",
    "/%252F%252Fevil.com",
    "/\t/evil.com",
    "/\n/evil.com",
    "/%09/evil.com",
    " /carnet-intime",
    "carnet-intime",
    "",
    "/connexion",
    "/onboarding",
    "/api/cycle",
    "/api/auth/logout",
    "/",
    "/charte",
    "/sos-ecoute",
    "/%E0%A4%A",
    `/${"a".repeat(600)}`,
  ])("%j", (input) => {
    expect(sanitizeNextPath(input)).toBeNull();
  });

  it("rejects non-string values", () => {
    expect(sanitizeNextPath(undefined)).toBeNull();
    expect(sanitizeNextPath(null)).toBeNull();
    expect(sanitizeNextPath(["/carnet-intime"])).toBeNull();
    expect(sanitizeNextPath({ toString: () => "/carnet-intime" })).toBeNull();
  });
});

describe("resolveNextPath", () => {
  it("falls back to the dashboard", () => {
    expect(resolveNextPath("//evil.com")).toBe("/tableau-de-bord");
    expect(resolveNextPath(null)).toBe("/tableau-de-bord");
    expect(resolveNextPath("/le-cercle")).toBe("/le-cercle");
  });
});
