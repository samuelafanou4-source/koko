import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withSession } from "@/lib/session";
import { healthDb } from "@/lib/db/health";
import { EncryptionService } from "@/lib/crypto";
import { calculateAverages, predictCycle } from "@/lib/cycle";
import { logServerError } from "@/lib/logger";

export const GET = withSession(async (_req, user) => {

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

    // Forecast only from a period start she actually recorded
    const latestCycle = cycleEntries[0];
    const prediction = latestCycle
      ? predictCycle(latestCycle.startDate, averageCycleLength, averagePeriodLength)
      : null;

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
});

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

export const POST = withSession(async (req: NextRequest, user) => {

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
      const start = new Date(startDate || Date.now());
      if (Number.isNaN(start.getTime()) || start.getTime() > Date.now()) {
        return NextResponse.json(
          { error: "Indique une date de début de règles valide (pas dans le futur)." },
          { status: 400 }
        );
      }
      const entry = await healthDb.cycleEntry.create({
        data: {
          anonId,
          startDate: start,
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
});

