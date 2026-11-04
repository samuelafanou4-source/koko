/**
 * Validation of the "next" parameter used after login (anti open-redirect).
 * Pure module: used by the proxy, the server and the login/sign-up pages.
 */
import { DASHBOARD_PATH, LOGIN_PATH, SIGNUP_PATH, isPrivateRoute } from "@/lib/routes";

const ORIGIN = "http://koko.invalid";
const MAX_LENGTH = 512;

/**
 * Returns a safe internal path ("/carnet-intime?x=1") or null.
 * Only relative paths to private pages are accepted: no scheme, no host,
 * no protocol-relative "//", no backslash, no control character, no API route,
 * no loop back to the login or sign-up page.
 */
export function sanitizeNextPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (value.length === 0 || value.length > MAX_LENGTH) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (value.includes("\\")) return null;
  if (/[\u0000-\u001f\u007f\s]/.test(value)) return null;

  // Encoded tricks: "/%2F%2Fevil.com", "/%5Cevil.com"
  let decoded = value;
  try {
    for (let i = 0; i < 3 && /%[0-9a-f]{2}/i.test(decoded); i++) {
      decoded = decodeURIComponent(decoded);
    }
  } catch {
    return null;
  }
  if (decoded.startsWith("//") || decoded.includes("\\")) return null;
  if (/[\u0000-\u001f\u007f]/.test(decoded)) return null;

  let url: URL;
  try {
    url = new URL(value, ORIGIN);
  } catch {
    return null;
  }
  if (url.origin !== ORIGIN) return null;

  const path = url.pathname;
  if (path === LOGIN_PATH || path === SIGNUP_PATH) return null;
  if (path === "/api" || path.startsWith("/api/")) return null;
  if (!isPrivateRoute(path)) return null;

  return `${path}${url.search}${url.hash}`;
}

export function resolveNextPath(value: unknown): string {
  return sanitizeNextPath(value) ?? DASHBOARD_PATH;
}
