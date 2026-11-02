import { NextResponse } from "next/server";
import { clearAuthCookies, getCurrentUser } from "@/lib/auth";
import { identityDb } from "@/lib/db/identity";
import { logServerError } from "@/lib/logger";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) {
      await identityDb.session.deleteMany({ where: { userId: user.userId } });
    }
  } catch {
    // The cookies below must be cleared even if the database is unreachable
    logServerError("auth.logout");
  }
  await clearAuthCookies();
  return NextResponse.json({ success: true, message: "Déconnexion réussie." });
}
