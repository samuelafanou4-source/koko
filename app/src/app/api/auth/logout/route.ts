import { NextResponse } from "next/server";
import { clearAuthCookies, getCurrentUser } from "@/lib/auth";
import { identityDb } from "@/lib/db/identity";

export async function POST() {
  const user = await getCurrentUser();
  if (user) {
    await identityDb.session.deleteMany({ where: { userId: user.userId } });
  }
  await clearAuthCookies();
  return NextResponse.json({ success: true, message: "Déconnexion réussie." });
}

