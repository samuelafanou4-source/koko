import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { healthDb } from "@/lib/db/health";
import { identityDb } from "@/lib/db/identity";

function isModerator(role: string) {
  return role === "MODERATOR" || role === "ADMIN";
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isModerator(user.role)) {
    return NextResponse.json({ error: "Accès réservé à la modération." }, { status: 403 });
  }

  const posts = await healthDb.forumPost.findMany({
    where: { status: { in: ["PENDING", "REJECTED"] } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const anonIds = Array.from(new Set(posts.map((p) => p.anonId)));
  const authors = await identityDb.userAccount.findMany({
    where: { anonId: { in: anonIds } },
    select: { anonId: true, pseudonym: true },
  });
  const authorMap = new Map(authors.map((a) => [a.anonId, a.pseudonym]));

  return NextResponse.json({
    posts: posts.map((p) => ({
      ...p,
      authorPseudonym: authorMap.get(p.anonId) || "SœurBienveillante",
    })),
  });
}

const moderateSchema = z.object({
  postId: z.string().min(1),
  action: z.enum(["APPROVE", "REJECT"]),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !isModerator(user.role)) {
    return NextResponse.json({ error: "Accès réservé à la modération." }, { status: 403 });
  }

  const parsed = moderateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Action invalide." }, { status: 400 });
  }

  const status = parsed.data.action === "APPROVE" ? "APPROVED" : "REJECTED";
  await healthDb.forumPost.update({
    where: { id: parsed.data.postId },
    data: { status },
  });

  return NextResponse.json({ success: true, status });
}
