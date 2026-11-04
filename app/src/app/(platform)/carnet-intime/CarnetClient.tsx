"use client";

import { useCallback, useEffect, useState } from "react";
import { CycleRing } from "@/components/ui/CycleRing";
import { CycleCalendar } from "@/components/ui/CycleCalendar";
import { MoodPicker } from "@/components/ui/MoodPicker";
import { useAppStore } from "@/lib/store";
import { SectionBoundary } from "@/components/errors/SectionBoundary";

interface CyclePredictionView {
  currentDay: number;
  totalCycleLength: number;
  periodLength: number;
  phaseLabel: string;
  midwifeTip: string;
  daysUntilNextPeriod: number;
  ovulationDate?: string;
  fertileWindowStart?: string;
  fertileWindowEnd?: string;
}

export default function CarnetIntimePage() {
  const { isDiscreetMode, toggleDiscreetMode } = useAppStore();
  // No forecast until she records a real period start
  const [prediction, setPrediction] = useState<CyclePredictionView | null>(null);
  const [lastStart, setLastStart] = useState<string | null>(null);
  const [periodStartInput, setPeriodStartInput] = useState("");
  const [periodError, setPeriodError] = useState("");
  const [savingPeriod, setSavingPeriod] = useState(false);

  const [flow, setFlow] = useState<"light" | "medium" | "heavy">("medium");
  const [mood, setMood] = useState("sereine");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [secretNote, setSecretNote] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const availableSymptoms = [
    "Crampes douces",
    "Tiraillements",
    "Poitrine sensible",
    "Énergie haute",
    "Ballonnements",
    "Sommeil agité",
    "Envie de chocolat",
    "Besoin de calme",
  ];

  const loadCycle = useCallback(() => {
    fetch("/api/cycle")
      .then((res) => res.json())
      .then((data) => {
        setPrediction(data.prediction ?? null);
        setLastStart(data.cycles?.[0]?.startDate ?? null);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadCycle();
  }, [loadCycle]);

  const handleSavePeriodStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodStartInput || savingPeriod) return;
    setSavingPeriod(true);
    setPeriodError("");
    try {
      const res = await fetch("/api/cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "CYCLE_START", startDate: periodStartInput }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPeriodError(data.error || "Impossible d'enregistrer la date pour le moment.");
        return;
      }
      setPeriodStartInput("");
      loadCycle();
    } catch {
      setPeriodError("Pas de connexion. Réessaie dans un instant.");
    } finally {
      setSavingPeriod(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    try {
      const res = await fetch("/api/cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "CYCLE_LOG",
          flowIntensity: flow,
          mood,
          symptoms: selectedSymptoms,
          note: secretNote,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSaveError(data.error || "Ton ressenti n'a pas pu être enregistré.");
        return;
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("Pas de connexion : ton ressenti n'a pas été enregistré.");
    }
  };

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  return (
    <div className="max-w-[1120px] mx-auto w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
        <div className="flex flex-col">
          <h1 className="font-display text-display text-on-surface tracking-tight font-bold">
            Mon carnet
          </h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl mt-0.5">
            Ton cycle, rien que pour toi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDiscreetMode}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-md font-label transition-all shadow-xs border border-outline-variant/30 ${
              isDiscreetMode
                ? "bg-primary text-on-primary font-bold"
                : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant"
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              {isDiscreetMode ? "visibility_off" : "visibility"}
            </span>
            <span>{isDiscreetMode ? "Mode Discret Actif" : "Mode Discret"}</span>
          </button>
          <a
            href="#log-section"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              edit_note
            </span>
            <span>Ressentis du jour</span>
          </a>
        </div>
      </div>

      {/* Record a real period start: the only source of predictions */}
      <SectionBoundary name="carnet-period">
      <form
        onSubmit={handleSavePeriodStart}
        className="rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg border border-outline-variant/40 flex flex-col sm:flex-row sm:items-end gap-3"
      >
        <div className="flex flex-col gap-1.5 flex-1">
          <label
            htmlFor="period-start"
            className="font-label text-label-md text-on-surface font-semibold"
          >
            {prediction
              ? "Tes nouvelles règles ont commencé ?"
              : "Quand tes dernières règles ont-elles commencé ?"}
          </label>
          <input
            id="period-start"
            type="date"
            value={periodStartInput}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setPeriodStartInput(e.target.value)}
            className="w-full sm:max-w-xs px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 font-body text-body-md text-on-surface"
          />
          {periodError && (
            <p className="font-body text-body-sm text-error">{periodError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!periodStartInput || savingPeriod}
          className="px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {savingPeriod ? "Enregistrement..." : "Enregistrer la date"}
        </button>
      </form>
      </SectionBoundary>

      {!prediction ? (
        <div className="rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-space-md sm:p-space-lg md:p-space-xl border border-outline-variant/30 flex flex-col items-center text-center gap-3">
          <span className="w-14 h-14 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-[28px]">calendar_month</span>
          </span>
          <h2 className="font-headline text-headline-md text-on-surface font-bold">
            Ton cycle s&apos;affichera ici
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-md">
            Indique la date de tes dernières règles.
          </p>
        </div>
      ) : (
      <>
      {/* Main Cycle Visual Card with Arch Top */}
      <SectionBoundary name="carnet-cycle">
      <div className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-space-md sm:p-space-lg md:p-space-xl shadow-xs border border-outline-variant/30">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          {/* Ring */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className={isDiscreetMode ? "discreet-blur" : ""}>
              <CycleRing
                currentDay={prediction.currentDay}
                totalCycleLength={prediction.totalCycleLength}
                periodLength={prediction.periodLength}
                phaseLabel={prediction.phaseLabel}
                size="lg"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#d98e73]" />
                <span className="font-label text-label-sm text-on-surface-variant">
                  Règles
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#c9c1e3]" />
                <span className="font-label text-label-sm text-on-surface-variant">
                  Fertile
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="font-label text-label-sm text-on-surface-variant">
                  Aujourd&apos;hui
                </span>
              </div>
            </div>
          </div>

          {/* Predictions Summary */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="bg-surface/80 backdrop-blur-md rounded-2xl p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-xs border border-outline-variant/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                    calendar_month
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-md text-on-surface-variant">
                    Prochaines règles estimées
                  </span>
                  <span
                    className={`font-headline text-headline-md text-on-surface font-bold ${
                      isDiscreetMode ? "discreet-blur" : ""
                    }`}
                  >
                    Dans environ {prediction.daysUntilNextPeriod} jours
                  </span>
                  <span className="font-body text-body-sm text-tertiary font-semibold">
                    Estimation
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="font-label text-label-sm text-on-surface-variant">
                  Cycle moyen
                </span>
                <span className="font-headline text-headline-sm text-on-surface font-bold">
                  {prediction.totalCycleLength} jours
                </span>
                <span className="font-label text-label-sm text-primary">
                  Règles : ~{prediction.periodLength} jours
                </span>
              </div>
            </div>

            <div className="bg-surface/80 backdrop-blur-md rounded-2xl p-space-md flex flex-col gap-2 shadow-xs border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label text-label-md text-on-surface-variant font-semibold">
                  Conseil du jour
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label text-label-sm font-semibold">
                  Jour {prediction.currentDay}
                </span>
              </div>
              <p className="font-body text-body-md text-on-surface leading-relaxed">
                « {prediction.midwifeTip} »
              </p>
            </div>
          </div>
        </div>
      </div>
      </SectionBoundary>

      <SectionBoundary name="carnet-history">
      <div className={isDiscreetMode ? "discreet-blur" : ""}>
        <CycleCalendar
          lastPeriodStart={lastStart}
          cycleLength={prediction.totalCycleLength}
          periodLength={prediction.periodLength}
          ovulationDate={prediction.ovulationDate}
          fertileWindowStart={prediction.fertileWindowStart}
          fertileWindowEnd={prediction.fertileWindowEnd}
        />
      </div>
      </SectionBoundary>
      <p className="font-body text-body-sm text-on-surface-variant -mt-3">
        Estimation seulement : ce n&apos;est pas une contraception.
      </p>
      </>
      )}

      {/* Daily Journal Form Section */}
      <SectionBoundary name="carnet-journal">
      <section
        id="log-section"
        className="rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-lowest p-space-md sm:p-space-lg md:p-space-xl shadow-xs border border-outline-variant/30 flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-[24px]">
              edit_note
            </span>
            <h2 className="font-headline text-headline-sm text-on-surface font-bold">
              Journal intime du jour
            </h2>
          </div>
          <span className="font-label text-label-sm text-on-surface-variant">
            Chiffrement individuel AES-256-GCM
          </span>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-space-md mt-2">
          {/* Mood Picker */}
          <MoodPicker
            initialMood={mood}
            onSave={(newMood) => setMood(newMood)}
          />

          {/* Flow Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md text-on-surface font-semibold">
              Flux menstruel (si règles aujourd&apos;hui) :
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-md">
              {(
                [
                  { id: "light", label: "Léger 💧" },
                  { id: "medium", label: "Moyen 💧💧" },
                  { id: "heavy", label: "Abondant 💧💧💧" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlow(f.id)}
                  className={`py-2 px-3 rounded-xl font-label text-label-sm border transition-all ${
                    flow === f.id
                      ? "bg-tertiary-fixed text-on-tertiary-fixed font-bold border-tertiary"
                      : "bg-surface-container-low text-on-surface-variant border-outline-variant/30"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms check */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md text-on-surface font-semibold">
              Sensations physiques &amp; corporelles :
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSymptoms.map((symptom) => {
                const active = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-3.5 py-1.5 rounded-full font-label text-label-sm transition-all border ${
                      active
                        ? "bg-primary-container text-on-primary-container font-semibold border-primary"
                        : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high"
                    }`}
                  >
                    {active ? "✓ " : "+ "}
                    {symptom}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secret encrypted note */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="secretNote"
              className="font-label text-label-md text-on-surface font-semibold flex items-center justify-between"
            >
              <span>Note intime personnelle (100% chiffrée) :</span>
              <span className="text-label-sm text-primary flex items-center gap-1 font-normal">
                <span aria-hidden="true" className="material-symbols-outlined text-[13px]">lock</span>
                Chiffrée avec ta clé secrète
              </span>
            </label>
            <textarea
              id="secretNote"
              value={secretNote}
              onChange={(e) => setSecretNote(e.target.value)}
              placeholder="Écris ici ce que tu ressens en toute confiance... Tes doutes, tes émotions ou tes questions pour ton prochain rendez-vous."
              rows={4}
              className={`w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 font-body text-body-md text-on-surface placeholder:text-on-surface-variant/60 ${
                isDiscreetMode ? "discreet-blur" : ""
              }`}
            />
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-primary-fixed/40 text-on-primary-fixed-variant font-label text-label-md flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Ton ressenti a été chiffré et sauvegardé avec amour dans ton carnet.</span>
            </div>
          )}
          {saveError && (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container font-label text-label-md flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">error</span>
              <span>{saveError}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs"
            >
              Enregistrer mes ressentis
            </button>
          </div>
        </form>
      </section>
      </SectionBoundary>

      {/* Privacy Toggles & WhatsApp Reminders */}
      <SectionBoundary name="carnet-settings">
      <div className="rounded-2xl bg-surface-container-low p-space-md sm:p-space-lg shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <h3 className="font-headline text-headline-sm text-on-surface font-bold flex items-center gap-2">
          <span aria-hidden="true" className="material-symbols-outlined text-secondary text-[22px]">
            tune
          </span>
          <span>Préférences de discrétion &amp; Rappels</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coded WhatsApp Reminder Toggle */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-label text-label-md text-on-surface font-semibold">
                Rappels WhatsApp camouflés
              </span>
              <p className="font-body text-body-sm text-on-surface-variant mt-1">
                Des rappels discrets, sans mot sensible.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label text-label-sm font-semibold shrink-0">
              Bientôt
            </span>
          </div>

          {/* Inactivity Veil Toggle */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-label text-label-md text-on-surface font-semibold">
                Voile anti-regards automatique
              </span>
              <p className="font-body text-body-sm text-on-surface-variant mt-1">
                L&apos;écran se floute après 2 minutes sans activité.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label text-label-sm font-semibold shrink-0">
              Toujours actif
            </span>
          </div>
        </div>
      </div>
      </SectionBoundary>
    </div>
  );
}

