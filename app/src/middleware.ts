import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PREFIXES = [
  "/tableau-de-bord",
  "/carnet-intime",
  "/assistant-koko",
  "/le-cercle",
  "/pass-sante",
  "/parametres",
  "/moderation",
];

async function hasValidToken(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  const accessOk = await hasValidToken(
    req.cookies.get("koko_access_session")?.value,
    process.env.JWT_ACCESS_SECRET
  );
  if (accessOk) return NextResponse.next();

  const refreshOk = await hasValidToken(
    req.cookies.get("koko_refresh_session")?.value,
    process.env.JWT_REFRESH_SECRET
  );
  if (refreshOk) return NextResponse.next();

  const login = new URL("/connexion", req.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/tableau-de-bord/:path*",
    "/carnet-intime/:path*",
    "/assistant-koko/:path*",
    "/le-cercle/:path*",
    "/pass-sante/:path*",
    "/parametres/:path*",
    "/moderation/:path*",
  ],
};
