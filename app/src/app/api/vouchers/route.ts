import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth";
import { healthDb } from "@/lib/db/health";
import { MOCK_HEALTH_CENTERS } from "@/lib/health-centers-data";
import { logServerError } from "@/lib/logger";

const createVoucherSchema = z.object({
  healthCenterId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const anonId = user?.anonId || `guest_${crypto.randomBytes(8).toString("hex")}`;

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

    // Find center from database or mock list
    let center = await healthDb.healthCenter.findUnique({
      where: { id: healthCenterId },
    });

    if (!center) {
      center = (MOCK_HEALTH_CENTERS.find(
        (c) => c.id === healthCenterId
      ) as unknown as typeof center) || null;
    }

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

    // Try persisting voucher if database table available
    try {
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
      // Fallback for demo when DB is not yet migrated
      return NextResponse.json({
        success: true,
        voucher: {
          id: `voucher_${code}`,
          code,
          centerName: center.name,
          centerAddress: center.address,
          city: center.city,
          priceInfo: center.priceInfo,
          expiresAt: expiresAt.toISOString(),
          qrData,
        },
      });
    }
  } catch {
    logServerError("vouchers.create");
    return NextResponse.json(
      { error: "Impossible de générer le bon de consultation." },
      { status: 500 }
    );
  }
}

