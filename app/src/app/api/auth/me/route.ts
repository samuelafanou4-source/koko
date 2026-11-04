import { NextResponse } from "next/server";
import { getApiSession, PRIVATE_CACHE_HEADERS } from "@/lib/session";

export async function GET() {
  const user = await getApiSession();
  if (!user) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { headers: PRIVATE_CACHE_HEADERS }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        pseudonym: user.pseudonym,
        anonId: user.anonId,
        role: user.role,
      },
    },
    { headers: PRIVATE_CACHE_HEADERS }
  );
}
