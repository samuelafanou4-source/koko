import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { healthDb } from "@/lib/db/health";
import { sortNearestFirst } from "@/lib/haversine";
import { logServerError } from "@/lib/logger";

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
    // Only centers entered in the database after a signed agreement: never a placeholder list
    const centers = await healthDb.healthCenter.findMany({
      where: city && city !== "all" ? { city } : undefined,
    });

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
    return NextResponse.json({ centers: [] });
  }
}

