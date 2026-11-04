"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CycleRing } from "@/components/ui/CycleRing";
import { SectionFallback } from "@/components/errors/SectionBoundary";
import { reportClientError } from "@/lib/client-errors";

export interface CyclePrediction {
  currentDay: number;
  totalCycleLength: number;
  periodLength: number;
  phaseLabel: string;
  phaseSummary: string;
  daysUntilNextPeriod: number;
}

type State =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "empty" }
  | { kind: "ready"; prediction: CyclePrediction };

/** Accepts only a complete prediction; anything else counts as "no data". */
export function parsePrediction(value: unknown): CyclePrediction | null {
  if (!value || typeof value !== "object") return null;
  const p = value as Record<string, unknown>;
  const numbers = ["currentDay", "totalCycleLength", "periodLength", "daysUntilNextPeriod"];
  if (!numbers.every((key) => typeof p[key] === "number" && Number.isFinite(p[key]))) return null;
  if (typeof p.phaseLabel !== "string") return null;
  return {
    currentDay: p.currentDay as number,
    totalCycleLength: p.totalCycleLength as number,
    periodLength: p.periodLength as number,
    phaseLabel: p.phaseLabel,
    phaseSummary: typeof p.phaseSummary === "string" ? p.phaseSummary : "",
    daysUntilNextPeriod: p.daysUntilNextPeriod as number,
  };
}

async function fetchPrediction(): Promise<CyclePrediction | null> {
  const res = await fetch("/api/cycle", { cache: "no-store" });
  if (!res.ok) throw new Error(`cycle-${res.status}`);
  const data: unknown = await res.json();
  return parsePrediction((data as { prediction?: unknown } | null)?.prediction);
}

const cardClass =
  "lg:col-span-5 bg-surface-container-low rounded-3xl p-space-md sm:p-space-lg border border-outline-variant/40 flex items-center gap-4";

/** Dashboard cycle card: loading, failure, empty (new account) and data states. */
export function CycleSnippet({ load = fetchPrediction }: { load?: () => Promise<CyclePrediction | null> }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  const refresh = useCallback(() => {
    setState({ kind: "loading" });
    load()
      .then((prediction) => setState(prediction ? { kind: "ready", prediction } : { kind: "empty" }))
      .catch((error: unknown) => {
        reportClientError("section-dashboard-cycle", error);
        setState({ kind: "error" });
      });
  }, [load]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (state.kind === "loading") {
    return (
      <div className={cardClass} aria-busy="true">
        <span className="w-14 h-14 shrink-0 rounded-full bg-surface-container animate-pulse" />
        <span className="flex-1 flex flex-col gap-2">
          <span className="h-4 w-2/3 rounded-full bg-surface-container animate-pulse" />
          <span className="h-3 w-1/2 rounded-full bg-surface-container animate-pulse" />
        </span>
      </div>
    );
  }

  if (state.kind === "error") {
    return <SectionFallback onRetry={refresh} className="lg:col-span-5" />;
  }

  return (
    <Link href="/carnet-intime" className={`${cardClass} hover:shadow-soft transition-shadow`}>
      {state.kind === "ready" ? (
        <>
          <CycleRing
            currentDay={state.prediction.currentDay}
            totalCycleLength={state.prediction.totalCycleLength}
            periodLength={state.prediction.periodLength}
            phaseLabel={state.prediction.phaseLabel}
            size="sm"
          />
          <span className="flex flex-col gap-1 min-w-0">
            <span className="font-label text-label-md text-tertiary">{state.prediction.phaseLabel}</span>
            <span className="font-headline text-headline-sm text-on-surface font-bold">
              Règles dans ~{state.prediction.daysUntilNextPeriod} jours
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">Estimation</span>
          </span>
        </>
      ) : (
        <>
          <span className="w-14 h-14 shrink-0 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-[28px]">calendar_month</span>
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-headline text-headline-sm text-on-surface font-bold">Suivre mon cycle</span>
            <span className="font-body text-body-md text-on-surface-variant">
              Rien de noté pour l&apos;instant. Note tes dernières règles quand tu veux.
            </span>
          </span>
        </>
      )}
      <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-outline ml-auto">
        chevron_right
      </span>
    </Link>
  );
}
