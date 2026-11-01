import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { identityDb } from "@/lib/db/identity";

const deleteSessionSchema = z.object({
  id: z.string().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Session non authentifiée." }, { status: 401 });
  }

  const sessions = await identityDb.session.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, expiresAt: true },
  });

  return NextResponse.json({ sessions });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Session non authentifiée." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const parsed = deleteSessionSchema.safeParse({
    id: searchParams.get("id") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Paramètre id invalide." }, { status: 400 });
  }

  const sessionId = parsed.data.id;

  if (sessionId) {
    await identityDb.session.deleteMany({
      where: { id: sessionId, userId: user.userId },
    });
  } else {
    await identityDb.session.deleteMany({ where: { userId: user.userId } });
  }

  return NextResponse.json({ success: true });
}
