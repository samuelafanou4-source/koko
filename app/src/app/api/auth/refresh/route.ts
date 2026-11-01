import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_COOKIE_NAME, rotateRefreshSession } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE_NAME)?.value;
  if (!refresh) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await rotateRefreshSession(refresh);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      pseudonym: user.pseudonym,
      anonId: user.anonId,
      role: user.role,
    },
  });
}
