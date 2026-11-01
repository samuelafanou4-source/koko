import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { EMERGENCY_CONTACTS } from "@/lib/constants";
import { MOCK_HEALTH_CENTERS } from "@/lib/health-centers-data";
import { healthDb } from "@/lib/db/health";
import { sortNearestFirst } from "@/lib/haversine";

const sosQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = sosQuerySchema.safeParse({
    lat: searchParams.get("lat") || undefined,
    lng: searchParams.get("lng") || undefined,
  });

  const lat = parsed.success ? parsed.data.lat : undefined;
  const lng = parsed.success ? parsed.data.lng : undefined;

  let centers = MOCK_HEALTH_CENTERS;
  try {
    const dbCenters = await healthDb.healthCenter.findMany();
    if (dbCenters.length > 0) {
      centers = dbCenters;
    }
  } catch {
    // Keep placeholder list when the health database is unavailable.
  }

  let nearest = centers[0] || null;
  if (lat !== undefined && lng !== undefined && centers.length > 0) {
    nearest = sortNearestFirst({ latitude: lat, longitude: lng }, centers)[0];
  }

  return NextResponse.json({
    contacts: EMERGENCY_CONTACTS,
    nearestCenter: nearest,
    note: "Les numéros d'urgence affichés sont des données prototype à confirmer avant lancement.",
  });
}
