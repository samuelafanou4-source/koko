import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { healthDb } from "@/lib/db/health";
import { EncryptionService } from "@/lib/crypto";
import { calculateAverages, predictCycle } from "@/lib/cycle";
import { logServerError } from "@/lib/logger";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    // Return sample demo prediction for anonymous/unregistered visitors
    const sampleStartDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const prediction = predictCycle(sampleStartDate, 28, 5);
    return NextResponse.json({
      authenticated: false,
      prediction,
      cycles: [],
      recentLogs: [],
    });
  }

  try {
    const anonId = user.anonId;

    // Fetch cycle entries
    const cycleEntries = await healthDb.cycleEntry.findMany({
      where: { anonId },
      orderBy: { startDate: "desc" },
      take: 12,
    });

    // Fetch daily logs
    const dailyLogs = await healthDb.dailyLog.findMany({
      where: { anonId },
      orderBy: { date: "desc" },
      take: 30,
    });

    // Decrypt notes in daily logs
    const decryptedLogs = dailyLogs.map((log) => ({
      id: log.id,
      date: log.date,
      mood: log.mood,
      symptoms: log.symptoms,
      note: EncryptionService.decryptNullable(
        log.encryptedNotes,
        log.notesIv,
        log.notesAuthTag
      ),
    }));

    // Calculate prediction based on past cycles
    const { averageCycleLength, averagePeriodLength } =
      calculateAverages(cycleEntries);

    const latestCycle = cycleEntries[0];
    const lastStartDate = latestCycle
      ? latestCycle.startDate
      : new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const prediction = predictCycle(
      lastStartDate,
      averageCycleLength,
      averagePeriodLength
    );

    return NextResponse.json({
      authenticated: true,
      prediction,
      averages: { averageCycleLength, averagePeriodLength },
      cycles: cycleEntries,
      recentLogs: decryptedLogs,
    });
  } catch {
    logServerError("cycle.get");
    return NextResponse.json(
      { error: "Impossible de récupérer les données du carnet." },
      { status: 500 }
    );
  }
}

const cyclePostSchema = z.object({
  type: z.enum(["CYCLE_START", "CYCLE_LOG", "MOOD_LOG"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  flowIntensity: z.enum(["light", "medium", "heavy"]).optional(),
  date: z.string().optional(),
  mood: z.string().optional(),
  symptoms: z.array(z.string()).optional(),
  note: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Connecte-toi pour enregistrer tes données dans ton carnet chiffré." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = cyclePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données de cycle invalides." },
        { status: 400 }
      );
    }

    const { type, startDate, endDate, flowIntensity, date, mood, symptoms, note } =
      parsed.data;
    const anonId = user.anonId;

    if (type === "CYCLE_START") {
      const entry = await healthDb.cycleEntry.create({
        data: {
          anonId,
          startDate: new Date(startDate || Date.now()),
          endDate: endDate ? new Date(endDate) : null,
          flowIntensity: flowIntensity || "medium",
          periodLength: 5,
          cycleLength: 28,
        },
      });
      return NextResponse.json({ success: true, entry });
    }

    if (type === "MOOD_LOG" || type === "CYCLE_LOG") {
      const logDate = new Date(date || Date.now());
      logDate.setHours(0, 0, 0, 0);

      // Encrypt sensitive secret note if provided
      const encNote = EncryptionService.encryptNullable(note);

      const log = await healthDb.dailyLog.upsert({
        where: {
          anonId_date: {
            anonId,
            date: logDate,
          },
        },
        create: {
          anonId,
          date: logDate,
          mood: mood || null,
          symptoms: symptoms || [],
          encryptedNotes: encNote?.ciphertext || null,
          notesIv: encNote?.iv || null,
          notesAuthTag: encNote?.authTag || null,
        },
        update: {
          mood: mood !== undefined ? mood : undefined,
          symptoms: symptoms !== undefined ? symptoms : undefined,
          ...(encNote
            ? {
                encryptedNotes: encNote.ciphertext,
                notesIv: encNote.iv,
                notesAuthTag: encNote.authTag,
              }
            : {}),
        },
      });

      return NextResponse.json({ success: true, log });
    }

    return NextResponse.json({ error: "Type d'action non supporté" }, { status: 400 });
  } catch {
    logServerError("cycle.post");
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement dans le carnet." },
      { status: 500 }
    );
  }
}

