import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  classifyRoute,
  isGuestOnlyPage,
  isNoIndexRoute,
} from "@/lib/routes";
import { sanitizeNextPath } from "@/lib/safe-next";

/**
 * Light, optimistic check (Next.js 16 "proxy", formerly "middleware"):
 * cookie present + valid JWT signature. The real authorization happens in
 * requireSession() / withSession(), which also check the session table.
 */

const ACCESS_COOKIE = "koko_access_session";
const REFRESH_COOKIE = "koko_refresh_session";
const PATH_HEADER = "x-koko-path";

const PRIVATE_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  Vary: "Cookie",
  "X-Robots-Tag": "noindex, nofollow",
};

async function hasValidSignature(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

function withHeaders(response: NextResponse, headers: Record<string, string>) {
  for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
  return response;
}

function clearSessionCookies(response: NextResponse) {
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const kind = classifyRoute(pathname);
  if (kind === "static") return NextResponse.next();

  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  const accessOk = await hasValidSignature(accessToken, process.env.JWT_ACCESS_SECRET);
  const refreshOk =
    !accessOk && (await hasValidSignature(refreshToken, process.env.JWT_REFRESH_SECRET));

  // The requested path, for the "next" parameter of server-side redirects
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(PATH_HEADER, `${pathname}${search}`);
  const passThrough = () => NextResponse.next({ request: { headers: requestHeaders } });

  if (kind === "public-page" || kind === "public-api") {
    // A logged-in user never sees the marketing page, login or sign-up
    if (kind === "public-page" && isGuestOnlyPage(pathname) && (accessOk || refreshOk)) {
      return withHeaders(
        NextResponse.redirect(new URL(DASHBOARD_PATH, req.url)),
        PRIVATE_HEADERS
      );
    }
    const response = passThrough();
    if (kind === "public-page" && isNoIndexRoute(pathname)) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    if (kind === "public-api") {
      response.headers.set("Cache-Control", PRIVATE_HEADERS["Cache-Control"]);
    }
    return response;
  }

  if (kind === "private-api") {
    // Expired access token + valid refresh token: the handler rotates it
    if (accessOk || refreshOk) return withHeaders(passThrough(), PRIVATE_HEADERS);
    return withHeaders(
      NextResponse.json(
        { error: "Connecte-toi pour accéder à ton espace.", authenticated: false },
        { status: 401 }
      ),
      PRIVATE_HEADERS
    );
  }

  // Private page
  if (accessOk) return withHeaders(passThrough(), PRIVATE_HEADERS);

  const next = sanitizeNextPath(`${pathname}${search}`);

  if (refreshOk) {
    const refresh = new URL("/api/auth/refresh", req.url);
    if (next) refresh.searchParams.set("next", next);
    return withHeaders(NextResponse.redirect(refresh), PRIVATE_HEADERS);
  }

  const login = new URL(LOGIN_PATH, req.url);
  if (next) login.searchParams.set("next", next);
  const response = NextResponse.redirect(login);
  // Cookies present but no longer valid: the session has expired
  if (accessToken || refreshToken) {
    login.searchParams.set("raison", "expiree");
    return withHeaders(clearSessionCookies(NextResponse.redirect(login)), PRIVATE_HEADERS);
  }
  return withHeaders(response, PRIVATE_HEADERS);
}

export const config = {
  matcher: [
    // Everything except build assets, icons and PWA files
    "/((?!_next/static|_next/image|icons/|brand/|favicon.ico|icon.svg|icon.png|apple-icon.png|opengraph-image.png|twitter-image.png|manifest.json|manifest.webmanifest|sw.js|robots.txt|sitemap.xml).*)",
  ],
};
