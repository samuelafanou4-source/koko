import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withSession } from "@/lib/session";
import { healthDb } from "@/lib/db/health";
import { logServerError } from "@/lib/logger";

const reactionSchema = z.object({
  postId: z.string().min(1),
  reactionType: z.enum(["HUG", "ME_TOO", "REPORT"]),
});

export const POST = withSession(async (req: NextRequest, user) => {

  try {
    const body = await req.json();
    const parsed = reactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Action invalide." }, { status: 400 });
    }

    const { postId, reactionType } = parsed.data;
    const anonId = user.anonId;

    if (reactionType === "REPORT") {
      await healthDb.forumPost.update({
        where: { id: postId },
        data: {
          reportsCount: { increment: 1 },
        },
      });
      return NextResponse.json({
        success: true,
        message: "Signalement pris en compte par l'équipe de modération.",
      });
    }

    // Check if user already reacted with this type
    const existing = await healthDb.forumReaction.findUnique({
      where: {
        postId_anonId_reactionType: {
          postId,
          anonId,
          reactionType,
        },
      },
    });

    if (existing) {
      // Remove reaction (toggle)
      await healthDb.forumReaction.delete({
        where: { id: existing.id },
      });

      await healthDb.forumPost.update({
        where: { id: postId },
        data:
          reactionType === "HUG"
            ? { hugReactions: { decrement: 1 } }
            : { meTooReactions: { decrement: 1 } },
      });

      return NextResponse.json({ success: true, action: "REMOVED" });
    } else {
      // Add reaction
      await healthDb.forumReaction.create({
        data: {
          postId,
          anonId,
          reactionType,
        },
      });

      await healthDb.forumPost.update({
        where: { id: postId },
        data:
          reactionType === "HUG"
            ? { hugReactions: { increment: 1 } }
            : { meTooReactions: { increment: 1 } },
      });

      return NextResponse.json({ success: true, action: "ADDED" });
    }
  } catch {
    logServerError("circle.reactions");
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de la réaction." },
      { status: 500 }
    );
  }
});

