import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withSession } from "@/lib/session";
import { healthDb } from "@/lib/db/health";
import { identityDb } from "@/lib/db/identity";
import { logServerError } from "@/lib/logger";

const getCommentsSchema = z.object({
  postId: z.string().min(1),
});

export const GET = withSession(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const parsed = getCommentsSchema.safeParse({
    postId: searchParams.get("postId") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "postId requis" }, { status: 400 });
  }

  const { postId } = parsed.data;

  try {
    const comments = await healthDb.forumComment.findMany({
      where: { postId, status: "APPROVED" },
      orderBy: { createdAt: "asc" },
      take: 100,
    });

    const anonIds = Array.from(new Set(comments.map((c) => c.anonId)));
    const authors = await identityDb.userAccount.findMany({
      where: { anonId: { in: anonIds } },
      select: { anonId: true, pseudonym: true },
    });

    const authorMap = new Map(authors.map((a) => [a.anonId, a.pseudonym]));

    const enriched = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      authorPseudonym: authorMap.get(c.anonId) || "SœurBienveillante",
    }));

    return NextResponse.json({ comments: enriched });
  } catch {
    logServerError("circle.comments.get");
    return NextResponse.json(
      { error: "Impossible de récupérer les réponses." },
      { status: 500 }
    );
  }
});

const addCommentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(2).max(1000),
});

export const POST = withSession(async (req: NextRequest, user) => {

  try {
    const body = await req.json();
    const parsed = addCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Réponse invalide." }, { status: 400 });
    }

    const { postId, content } = parsed.data;

    const comment = await healthDb.forumComment.create({
      data: {
        postId,
        anonId: user.anonId,
        content,
        status: "APPROVED",
      },
    });

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        authorPseudonym: user.pseudonym,
      },
    });
  } catch {
    logServerError("circle.comments.post");
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la réponse." },
      { status: 500 }
    );
  }
});

