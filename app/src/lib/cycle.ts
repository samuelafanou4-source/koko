import { addDays, differenceInCalendarDays, isAfter, isBefore, startOfDay } from "date-fns";

export type CyclePhase = "MENSTRUAL" | "FOLLICULAR" | "FERTILE" | "LUTEAL";

export interface CyclePrediction {
  currentDay: number;
  totalCycleLength: number;
  periodLength: number;
  currentPhase: CyclePhase;
  phaseLabel: string;
  phaseSummary: string;
  midwifeTip: string;
  nextPeriodDate: Date;
  daysUntilNextPeriod: number;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  isFertileToday: boolean;
  isOvulationToday: boolean;
}

export interface PastCycleInput {
  startDate: Date | string;
  endDate?: Date | string | null;
  cycleLength?: number | null;
  periodLength?: number | null;
}

const DEFAULT_CYCLE_LENGTH = 28;
const DEFAULT_PERIOD_LENGTH = 5;

/**
 * Calcule la durée moyenne des cycles à partir de l'historique
 */
export function calculateAverages(cycles: PastCycleInput[]): {
  averageCycleLength: number;
  averagePeriodLength: number;
} {
  if (!cycles || cycles.length === 0) {
    return {
      averageCycleLength: DEFAULT_CYCLE_LENGTH,
      averagePeriodLength: DEFAULT_PERIOD_LENGTH,
    };
  }

  const validCycleLengths = cycles
    .map((c) => c.cycleLength)
    .filter((l): l is number => typeof l === "number" && l >= 20 && l <= 45);

  const validPeriodLengths = cycles
    .map((c) => c.periodLength)
    .filter((l): l is number => typeof l === "number" && l >= 2 && l <= 10);

  const avgCycle =
    validCycleLengths.length > 0
      ? Math.round(
          validCycleLengths.reduce((a, b) => a + b, 0) /
            validCycleLengths.length
        )
      : DEFAULT_CYCLE_LENGTH;

  const avgPeriod =
    validPeriodLengths.length > 0
      ? Math.round(
          validPeriodLengths.reduce((a, b) => a + b, 0) /
            validPeriodLengths.length
        )
      : DEFAULT_PERIOD_LENGTH;

  return {
    averageCycleLength: avgCycle,
    averagePeriodLength: avgPeriod,
  };
}

/**
 * Prédiction complète du cycle menstruel et conseils de sage-femme
 */
export function predictCycle(
  lastPeriodStart: Date | string,
  averageCycleLength = DEFAULT_CYCLE_LENGTH,
  averagePeriodLength = DEFAULT_PERIOD_LENGTH,
  referenceDate: Date = new Date()
): CyclePrediction {
  const start = startOfDay(new Date(lastPeriodStart));
  const today = startOfDay(referenceDate);

  const daysSinceStart = differenceInCalendarDays(today, start);
  // Current day in cycle (1-based)
  const currentDay =
    daysSinceStart >= 0
      ? (daysSinceStart % averageCycleLength) + 1
      : 1;

  // Ovulation typically occurs 14 days before next period
  const ovulationDayOffset = Math.max(1, averageCycleLength - 14);
  const nextPeriodDate = addDays(start, averageCycleLength);
  const daysUntilNextPeriod = Math.max(
    0,
    differenceInCalendarDays(nextPeriodDate, today)
  );

  const ovulationDate = addDays(start, ovulationDayOffset - 1);
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  const isFertileToday =
    (isAfter(today, fertileWindowStart) ||
      today.getTime() === fertileWindowStart.getTime()) &&
    (isBefore(today, fertileWindowEnd) ||
      today.getTime() === fertileWindowEnd.getTime());

  const isOvulationToday = today.getTime() === ovulationDate.getTime();

  let phase: CyclePhase;
  let phaseLabel: string;
  let phaseSummary: string;
  let midwifeTip: string;

  if (currentDay <= averagePeriodLength) {
    phase = "MENSTRUAL";
    phaseLabel = "Phase Menstruelle";
    phaseSummary = "Temps de repos, élimination naturelle";
    midwifeTip =
      "Ton corps travaille fort. Privilégie une alimentation riche en fer (feuilles de manioc, haricots, moringa) et applique une bouillotte chaude sur ton bas-ventre en cas de crampes.";
  } else if (currentDay < ovulationDayOffset - 5) {
    phase = "FOLLICULAR";
    phaseLabel = "Phase Folliculaire";
    phaseSummary = "Regain d'énergie & fraîcheur";
    midwifeTip =
      "Les œstrogènes grimpent doucement. Tu te sentiras sans doute plus alerte et concentrée pour tes révisions ou tes projets. Reste bien hydratée face à la chaleur de Lomé et Kara.";
  } else if (currentDay <= ovulationDayOffset + 1) {
    phase = "FERTILE";
    phaseLabel = "Phase Ovulatoire";
    phaseSummary = "Pic de fertilité & énergie rayonnante";
    midwifeTip =
      "Ton corps libère un ovule. Ta température basale peut légèrement monter et tes pertes deviennent plus fluides et transparentes (comme du blanc d'œuf). Si tu as des rapports sans désir de grossesse, veille scrupuleusement à ta contraception.";
  } else {
    phase = "LUTEAL";
    phaseLabel = "Phase Lutéale";
    phaseSummary = "Ralentissement doux & écoute de soi";
    midwifeTip =
      "La progestérone prédomine. Si tu ressens une légère tension mammaire ou des sautes d'humeur, c'est parfaitement normal. Offre-toi des nuits réparatrices et évite l'excès de caféine.";
  }

  return {
    currentDay,
    totalCycleLength: averageCycleLength,
    periodLength: averagePeriodLength,
    currentPhase: phase,
    phaseLabel,
    phaseSummary,
    midwifeTip,
    nextPeriodDate,
    daysUntilNextPeriod,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    isFertileToday,
    isOvulationToday,
  };
}

