import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  REFRESH_COOKIE_NAME,
  clearAuthCookies,
  rotateRefreshSession,
} from "@/lib/auth";
import { PRIVATE_CACHE_HEADERS, loginUrl } from "@/lib/session";
import { resolveNextPath } from "@/lib/safe-next";
import { logServerError } from "@/lib/logger";

async function rotate() {
  const refresh = (await cookies()).get(REFRESH_COOKIE_NAME)?.value;
  if (!refresh) return null;
  try {
    return await rotateRefreshSession(refresh);
  } catch {
    logServerError("auth.refresh");
    return null;
  }
}

/**
 * Navigation flow: the proxy (or a private layout) sends her here when the
 * access token has expired. On success she goes back to the page she asked
 * for; otherwise the dead cookies are removed and she lands on /connexion
 * with a gentle "session expired" message.
 */
export async function GET(req: NextRequest) {
  const nextParam = req.nextUrl.searchParams.get("next");
  const session = await rotate();

  if (!session) {
    await clearAuthCookies();
    const target = new URL(loginUrl(nextParam, "expiree"), req.url);
    return NextResponse.redirect(target, { status: 303, headers: PRIVATE_CACHE_HEADERS });
  }

  const target = new URL(resolveNextPath(nextParam), req.url);
  return NextResponse.redirect(target, { status: 303, headers: PRIVATE_CACHE_HEADERS });
}

/** Programmatic flow: renews the session and answers in JSON. */
export async function POST() {
  const session = await rotate();
  if (!session) {
    await clearAuthCookies();
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: PRIVATE_CACHE_HEADERS }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        pseudonym: session.pseudonym,
        anonId: session.anonId,
        role: session.role,
      },
    },
    { headers: PRIVATE_CACHE_HEADERS }
  );
}
