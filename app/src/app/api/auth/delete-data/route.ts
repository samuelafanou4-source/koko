import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth";
import { withSession } from "@/lib/session";
import { identityDb } from "@/lib/db/identity";
import { healthDb } from "@/lib/db/health";
import { logServerError } from "@/lib/logger";

export const DELETE = withSession(async (_req, user) => {

  try {
    const { anonId, userId } = user;

    // 1. Wipe all sensitive health and forum records associated with the opaque anonId
    await healthDb.$transaction([
      healthDb.dailyLog.deleteMany({ where: { anonId } }),
      healthDb.cycleEntry.deleteMany({ where: { anonId } }),
      healthDb.assistantMessage.deleteMany({ where: { anonId } }),
      healthDb.forumReaction.deleteMany({ where: { anonId } }),
      healthDb.forumComment.deleteMany({ where: { anonId } }),
      healthDb.forumPost.deleteMany({ where: { anonId } }),
      healthDb.healthVoucher.deleteMany({ where: { anonId } }),
    ]);

    // 2. Wipe identity account & sessions
    await identityDb.$transaction([
      identityDb.session.deleteMany({ where: { userId } }),
      identityDb.userAccount.deleteMany({ where: { id: userId } }),
    ]);

    // 3. Clear auth cookies
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
      message:
        "Toutes tes données d'identité et de santé ont été définitivement et irréversiblement effacées.",
    });
  } catch {
    logServerError("auth.delete-data");
    return NextResponse.json(
      { error: "Impossible d'effacer les données. Réessaie dans un instant." },
      { status: 500 }
    );
  }
});

