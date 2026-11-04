/**
 * Automatic inventory of every page and API route in src/app.
 * A new route is picked up by the tests without anyone having to list it.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export const APP_DIR = path.resolve(__dirname, "..", "..", "src", "app");

export interface PageRoute {
  url: string;
  file: string;
  group: string | null;
}

export interface ApiRoute {
  url: string;
  file: string;
  methods: string[];
}

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function toUrl(relativeDir: string): { url: string; group: string | null } {
  const segments = relativeDir.split(path.sep).filter(Boolean);
  const group = segments.find((segment) => /^\(.+\)$/.test(segment)) ?? null;
  const urlSegments = segments.filter((segment) => !/^\(.+\)$/.test(segment) && !segment.startsWith("@"));
  if (urlSegments.some((segment) => segment.startsWith("["))) {
    throw new Error(
      `Route dynamique ${relativeDir} : ajoute un exemple de paramètre dans tests/support/route-inventory.ts`
    );
  }
  return { url: "/" + urlSegments.join("/"), group };
}

export function listPageRoutes(): PageRoute[] {
  return walk(APP_DIR)
    .filter((file) => /[\\/]page\.(tsx|ts|jsx|js)$/.test(file))
    .map((file) => {
      const { url, group } = toUrl(path.relative(APP_DIR, path.dirname(file)));
      return { url, file, group };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}

export function listApiRoutes(): ApiRoute[] {
  return walk(path.join(APP_DIR, "api"))
    .filter((file) => /[\\/]route\.(ts|js)$/.test(file))
    .map((file) => {
      const code = readFileSync(file, "utf8");
      const methods = HTTP_METHODS.filter((method) =>
        new RegExp(`export\\s+(async\\s+function|const|function)\\s+${method}\\b`).test(code)
      );
      return { url: toUrl(path.relative(APP_DIR, path.dirname(file))).url, file, methods };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
