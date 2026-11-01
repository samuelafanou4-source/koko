import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { healthDb } from "@/lib/db/health";
import { sortNearestFirst } from "@/lib/haversine";
import { MOCK_HEALTH_CENTERS } from "@/lib/health-centers-data";
import { logServerError } from "@/lib/logger";

export { MOCK_HEALTH_CENTERS };

const querySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  city: z.string().max(100).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse({
    lat: searchParams.get("lat") ?? undefined,
    lng: searchParams.get("lng") ?? undefined,
    city: searchParams.get("city") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Paramètres de recherche invalides." },
      { status: 400 }
    );
  }

  const { lat, lng, city } = parsed.data;

  try {
    let centers = await healthDb.healthCenter.findMany({
      where: city && city !== "all" ? { city } : undefined,
    });

    if (!centers || centers.length === 0) {
      // Use verified mock list if database has not been seeded yet
      centers = MOCK_HEALTH_CENTERS.filter(
        (c) => !city || city === "all" || c.city.toLowerCase() === city.toLowerCase()
      ) as unknown as typeof centers;
    }

    // If coordinates supplied, sort by nearest distance using Haversine formula
    if (lat !== undefined && lng !== undefined) {
      const sorted = sortNearestFirst(
        { latitude: lat, longitude: lng },
        centers
      );
      return NextResponse.json({ centers: sorted });
    }

    return NextResponse.json({ centers });
  } catch {
    logServerError("health-centers.get");
    // Return mock centers directly on fallback
    return NextResponse.json({ centers: MOCK_HEALTH_CENTERS });
  }
}

