import { describe, it, expect } from "vitest";
import { predictCycle, calculateAverages } from "../cycle";

describe("Menstrual Cycle Engine", () => {
  it("calculates accurate cycle day and phase for mid-cycle", () => {
    // Exactly 13 days since start -> Day 14 of 28
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 13);

    const prediction = predictCycle(startDate, 28, 5);

    expect(prediction.currentDay).toBe(14);
    expect(prediction.currentPhase).toBe("FERTILE");
    expect(prediction.isFertileToday).toBe(true);
    expect(prediction.daysUntilNextPeriod).toBe(15);
  });

  it("identifies menstrual phase during active flow days", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1); // Day 2

    const prediction = predictCycle(startDate, 28, 5);

    expect(prediction.currentDay).toBe(2);
    expect(prediction.currentPhase).toBe("MENSTRUAL");
    expect(prediction.phaseLabel).toContain("Menstruelle");
    expect(prediction.midwifeTip).toBeDefined();
  });

  it("calculates historical averages correctly", () => {
    const mockPastCycles = [
      { startDate: new Date("2026-08-01"), cycleLength: 28, periodLength: 5 },
      { startDate: new Date("2026-09-01"), cycleLength: 30, periodLength: 4 },
      { startDate: new Date("2026-10-01"), cycleLength: 26, periodLength: 6 },
    ];

    const averages = calculateAverages(mockPastCycles);

    expect(averages.averageCycleLength).toBe(28); // (28+30+26)/3 = 28
    expect(averages.averagePeriodLength).toBe(5); // (5+4+6)/3 = 5
  });

  it("falls back to standard 28/5 defaults when no history is provided", () => {
    const averages = calculateAverages([]);
    expect(averages.averageCycleLength).toBe(28);
    expect(averages.averagePeriodLength).toBe(5);
  });
});
