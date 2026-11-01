import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { healthDb } from "@/lib/db/health";
import { logServerError } from "@/lib/logger";

const validateSchema = z.object({
  code: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = validateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Code du bon requis." }, { status: 400 });
    }

    const { code } = parsed.data;

    const voucher = await healthDb.healthVoucher.findUnique({
      where: { code },
      include: { healthCenter: true },
    });

    if (!voucher) {
      return NextResponse.json(
        { valid: false, error: "Bon introuvable ou invalide." },
        { status: 404 }
      );
    }

    if (voucher.status === "USED") {
      return NextResponse.json(
        { valid: false, error: "Ce bon a déjà été utilisé le " + voucher.usedAt?.toLocaleDateString("fr-FR") },
        { status: 400 }
      );
    }

    if (new Date() > voucher.expiresAt) {
      return NextResponse.json(
        { valid: false, error: "Ce bon a expiré." },
        { status: 400 }
      );
    }

    // Mark as USED
    await healthDb.healthVoucher.update({
      where: { id: voucher.id },
      data: {
        status: "USED",
        usedAt: new Date(),
      },
    });

    return NextResponse.json({
      valid: true,
      status: "USED",
      message: `Bon validé avec succès pour ${voucher.healthCenter.name}.`,
      center: voucher.healthCenter.name,
      priceInfo: voucher.healthCenter.priceInfo,
    });
  } catch {
    logServerError("vouchers.validate");
    return NextResponse.json(
      { error: "Erreur lors de la validation du bon." },
      { status: 500 }
    );
  }
}

