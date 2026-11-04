import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { withSession } from "@/lib/session";
import { healthDb } from "@/lib/db/health";
import { logServerError } from "@/lib/logger";

const createVoucherSchema = z.object({
  healthCenterId: z.string().min(1),
});

export const POST = withSession(async (req: NextRequest, user) => {
  const anonId = user.anonId;

  try {
    const body = await req.json();
    const parsed = createVoucherSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Centre de santé invalide." },
        { status: 400 }
      );
    }

    const { healthCenterId } = parsed.data;

    const center = await healthDb.healthCenter.findUnique({
      where: { id: healthCenterId },
    });

    if (!center) {
      return NextResponse.json(
        { error: "Centre de santé introuvable." },
        { status: 404 }
      );
    }

    // Generate unique anonymized voucher code
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const code = `KOKO-${randomHex.slice(0, 3)}-${randomHex.slice(3, 6)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

    const qrData = JSON.stringify({
      app: "koko-togo",
      code,
      centerId: center.id,
      centerName: center.name,
      validUntil: expiresAt.toISOString(),
    });

    // A voucher only exists once stored: the center must be able to validate it
    const dbVoucher = await healthDb.healthVoucher.create({
      data: {
        code,
        anonId,
        healthCenterId: center.id,
        status: "ACTIVE",
        expiresAt,
        qrData,
      },
    });

    return NextResponse.json({
      success: true,
      voucher: {
        id: dbVoucher.id,
        code: dbVoucher.code,
        centerName: center.name,
        centerAddress: center.address,
        city: center.city,
        priceInfo: center.priceInfo,
        expiresAt: dbVoucher.expiresAt,
        qrData: dbVoucher.qrData,
      },
    });
  } catch {
    logServerError("vouchers.create");
    return NextResponse.json(
      { error: "Impossible de générer le bon de consultation." },
      { status: 500 }
    );
  }
});

