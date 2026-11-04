/**
 * Route access rules, shared by the proxy, the session helper and the tests.
 * Pure module: no Next.js or Node imports, safe in any runtime.
 *
 * Default deny: anything that is not explicitly public is private.
 */

export const DASHBOARD_PATH = "/tableau-de-bord";
export const LOGIN_PATH = "/connexion";
export const SIGNUP_PATH = "/onboarding";

/** Pages reachable without a session (exact match after normalisation). */
export const PUBLIC_PAGES = [
  "/",
  SIGNUP_PATH,
  LOGIN_PATH,
  "/charte",
  "/sos-ecoute",
  "/offline",
] as const;

/** Pages a logged-in user should not see: she is sent to her dashboard. */
export const GUEST_ONLY_PAGES = ["/", SIGNUP_PATH, LOGIN_PATH] as const;

/** API routes reachable without a session (exact match after normalisation). */
export const PUBLIC_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/logout",
  "/api/auth/me",
  "/api/auth/pseudonyms",
  // Emergency contacts must work for anyone in distress
  "/api/sos",
  // Protected by their own secrets (Meta verify token / CRON_SECRET)
  "/api/whatsapp/webhook",
  "/api/whatsapp/reminders",
  // Used by partner health centres, who have no Koko account
  "/api/vouchers/validate",
] as const;

/** Files that are always public (crawlers, PWA). */
export const PUBLIC_FILES = [
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/sw.js",
  "/favicon.ico",
] as const;

const STATIC_PREFIXES = ["/_next/static/", "/_next/image", "/icons/"];

const STATIC_EXTENSION =
  /\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|woff2?|ttf|txt|xml|webmanifest)$/i;

/**
 * Normalises a pathname for matching: decodes percent-escapes (repeatedly, so
 * double-encoding cannot hide a segment), turns backslashes into slashes,
 * collapses duplicate slashes, resolves "." and ".." segments and drops the
 * trailing slash. Returns null if the path cannot be decoded: callers must
 * then treat it as private.
 */
export function normalizePathname(rawPath: string): string | null {
  let path = rawPath.split(/[?#]/, 1)[0] ?? "";
  try {
    for (let i = 0; i < 3 && /%[0-9a-f]{2}/i.test(path); i++) {
      path = decodeURIComponent(path);
    }
  } catch {
    return null;
  }
  if (/[\u0000-\u001f\u007f]/.test(path)) return null;

  path = path.replace(/\\/g, "/");
  const segments: string[] = [];
  for (const segment of path.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return "/" + segments.join("/");
}

export type RouteKind =
  | "static"
  | "public-page"
  | "public-api"
  | "private-page"
  | "private-api";

export function classifyRoute(rawPath: string): RouteKind {
  const path = normalizePathname(rawPath);
  if (path === null) {
    return rawPath.startsWith("/api") ? "private-api" : "private-page";
  }

  if (path === "/api" || path.startsWith("/api/")) {
    return (PUBLIC_API_ROUTES as readonly string[]).includes(path)
      ? "public-api"
      : "private-api";
  }

  if ((PUBLIC_PAGES as readonly string[]).includes(path)) return "public-page";
  if ((PUBLIC_FILES as readonly string[]).includes(path)) return "static";

  // Check the raw path too: normalisation must never turn a page into an asset
  const raw = rawPath.split(/[?#]/, 1)[0] ?? "";
  if (
    STATIC_PREFIXES.some((prefix) => raw.startsWith(prefix) && path.startsWith(prefix.replace(/\/$/, ""))) ||
    (STATIC_EXTENSION.test(path) && STATIC_EXTENSION.test(raw))
  ) {
    return "static";
  }

  return "private-page";
}

export function isPrivateRoute(rawPath: string): boolean {
  const kind = classifyRoute(rawPath);
  return kind === "private-page" || kind === "private-api";
}

export function isGuestOnlyPage(rawPath: string): boolean {
  const path = normalizePathname(rawPath);
  return path !== null && (GUEST_ONLY_PAGES as readonly string[]).includes(path);
}

/** Pages that must never be indexed by search engines. */
export function isNoIndexRoute(rawPath: string): boolean {
  const path = normalizePathname(rawPath);
  if (path === null) return true;
  return isPrivateRoute(rawPath) || path === LOGIN_PATH || path === SIGNUP_PATH || path === "/offline";
}
