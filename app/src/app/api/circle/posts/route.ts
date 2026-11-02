import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { healthDb } from "@/lib/db/health";
import { identityDb } from "@/lib/db/identity";
import { forumLimiter, checkRateLimit } from "@/lib/rate-limit";
import { logServerError } from "@/lib/logger";

const getPostsSchema = z.object({
  category: z.string().max(50).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = getPostsSchema.safeParse({
    category: searchParams.get("category") ?? undefined,
  });

  const category = parsed.success ? parsed.data.category : undefined;

  try {
    const whereClause: { status: string; category?: string } = {
      status: "APPROVED",
    };
    if (category && category !== "all") {
      whereClause.category = category;
    }

    const posts = await healthDb.forumPost.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { comments: true },
        },
      },
      take: 50,
    });

    // Hermetic lookup: resolve author pseudonym in Identity DB via opaque anonId
    const anonIds = Array.from(new Set(posts.map((p) => p.anonId)));
    const authors = await identityDb.userAccount.findMany({
      where: { anonId: { in: anonIds } },
      select: { anonId: true, pseudonym: true },
    });

    const authorMap = new Map(authors.map((a) => [a.anonId, a.pseudonym]));

    const enrichedPosts = posts.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      content: p.content,
      createdAt: p.createdAt,
      hugReactions: p.hugReactions,
      meTooReactions: p.meTooReactions,
      commentsCount: p._count.comments,
      authorPseudonym: authorMap.get(p.anonId) || "SœurBienveillante",
    }));

    return NextResponse.json({ posts: enrichedPosts });
  } catch {
    logServerError("circle.posts.get");
    return NextResponse.json(
      { error: "Impossible de charger les échanges du Cercle." },
      { status: 500 }
    );
  }
}

const createPostSchema = z.object({
  title: z.string().min(4).max(120),
  category: z.string().min(2).max(50),
  content: z.string().min(10).max(3000),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Connecte-toi avec ton pseudonyme pour participer au Cercle." },
      { status: 401 }
    );
  }

  // Rate limit
  const rateLimit = await checkRateLimit(forumLimiter, user.anonId);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Tu as publié récemment. Patiente un instant avant un nouveau message." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Vérifie les informations de ton message (titre et contenu requis)." },
        { status: 400 }
      );
    }

    const { title, category, content } = parsed.data;

    const post = await healthDb.forumPost.create({
      data: {
        anonId: user.anonId,
        title,
        category,
        content,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      pending: true,
      message:
        "Ton message est en attente de validation par l'équipe de modération.",
      post: {
        ...post,
        authorPseudonym: user.pseudonym,
        commentsCount: 0,
      },
    });
  } catch {
    logServerError("circle.posts.post");
    return NextResponse.json(
      { error: "Erreur lors de la publication de ton message." },
      { status: 500 }
    );
  }
}

