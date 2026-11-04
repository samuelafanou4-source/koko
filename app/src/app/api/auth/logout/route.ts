import { NextResponse } from "next/server";
import { clearAuthCookies, identifyFromCookies } from "@/lib/auth";
import { identityDb } from "@/lib/db/identity";
import { PRIVATE_CACHE_HEADERS } from "@/lib/session";
import { logServerError } from "@/lib/logger";

/**
 * Destroys the session server-side (every session of the account, as before:
 * on a shared phone, leaving must close everything) and removes the cookies.
 * Works even with an expired access token.
 */
export async function POST() {
  try {
    const userId = await identifyFromCookies();
    if (userId) {
      await identityDb.session.deleteMany({ where: { userId } });
    }
  } catch {
    // The cookies below must be cleared even if the database is unreachable
    logServerError("auth.logout");
  }
  await clearAuthCookies();
  return NextResponse.json(
    { success: true, message: "Déconnexion réussie." },
    // Asks the browser to drop anything it kept for this site
    { headers: { ...PRIVATE_CACHE_HEADERS, "Clear-Site-Data": '"cache"' } }
  );
}
