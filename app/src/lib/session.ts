import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  rotateRefreshSession,
  verifySessionToken,
  type TokenPayload,
} from "@/lib/auth";
import { LOGIN_PATH } from "@/lib/routes";
import { sanitizeNextPath } from "@/lib/safe-next";

export type Session = TokenPayload;

/** Request header set by the proxy with the requested path (for "next"). */
export const PATH_HEADER = "x-koko-path";

/** Cache headers for every private response (pages and API). */
export const PRIVATE_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  Vary: "Cookie",
};

export function isStaffRole(role: string): boolean {
  return role === "MODERATOR" || role === "ADMIN";
}

/**
 * Current session from the access cookie, verified against the session table.
 * Read-only (never writes cookies), deduplicated per request.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ACCESS_COOKIE_NAME)?.value);
});

export function loginUrl(nextPath: string | null, reason?: "expiree"): string {
  const params = new URLSearchParams();
  const next = sanitizeNextPath(nextPath);
  if (next) params.set("next", next);
  if (reason) params.set("raison", reason);
  const query = params.toString();
  return query ? `${LOGIN_PATH}?${query}` : LOGIN_PATH;
}

export function refreshUrl(nextPath: string | null): string {
  const next = sanitizeNextPath(nextPath);
  return next
    ? `/api/auth/refresh?next=${encodeURIComponent(next)}`
    : "/api/auth/refresh";
}

/**
 * For private server components, layouts and server actions.
 * Without a valid session: redirects to the refresh endpoint if a refresh
 * cookie exists (it renews the access token and comes back), else to /connexion.
 */
export async function requireSession(options?: { roles?: string[] }): Promise<Session> {
  const session = await getSession();
  if (!session) {
    const cookieStore = await cookies();
    const requestedPath = (await headers()).get(PATH_HEADER);
    if (cookieStore.get(REFRESH_COOKIE_NAME)?.value) {
      redirect(refreshUrl(requestedPath));
    }
    redirect(loginUrl(requestedPath));
  }
  if (options?.roles && !options.roles.includes(session.role)) {
    redirect("/tableau-de-bord");
  }
  return session;
}

/**
 * For route handlers: the access cookie, or a transparent refresh-token
 * rotation when it has expired (route handlers may set cookies).
 */
export async function getApiSession(): Promise<Session | null> {
  const session = await getSession();
  if (session) return session;
  const refresh = (await cookies()).get(REFRESH_COOKIE_NAME)?.value;
  if (!refresh) return null;
  return rotateRefreshSession(refresh);
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { error: "Connecte-toi pour accéder à ton espace.", authenticated: false },
    { status: 401, headers: PRIVATE_CACHE_HEADERS }
  );
}

export function forbiddenResponse(): NextResponse {
  return NextResponse.json(
    { error: "Accès réservé à la modération." },
    { status: 403, headers: PRIVATE_CACHE_HEADERS }
  );
}

export function applyPrivateHeaders<T extends Response>(response: T): T {
  for (const [key, value] of Object.entries(PRIVATE_CACHE_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

type SessionHandler<C> = (
  req: NextRequest,
  session: Session,
  context: C
) => Promise<Response> | Response;

/**
 * Wraps a private route handler: 401 without a valid session, 403 if the role
 * is not allowed, and no-store cache headers on every response.
 */
export function withSession<C = unknown>(
  handler: SessionHandler<C>,
  options?: { roles?: string[] }
) {
  return async (req: NextRequest, context: C): Promise<Response> => {
    const session = await getApiSession();
    if (!session) return unauthorizedResponse();
    if (options?.roles && !options.roles.includes(session.role)) {
      return forbiddenResponse();
    }
    return applyPrivateHeaders(await handler(req, session, context));
  };
}
