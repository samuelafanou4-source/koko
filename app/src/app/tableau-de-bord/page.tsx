"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { CycleRing } from "@/components/ui/CycleRing";
import { MoodPicker } from "@/components/ui/MoodPicker";
import { AuthGate } from "@/components/auth/AuthGate";

const SPACES = [
  {
    href: "/assistant-koko",
    icon: "chat_bubble",
    title: "Parler à Koko",
    text: "Pose ta question, sans jugement.",
    tone: "bg-primary text-on-primary",
  },
  {
    href: "/carnet-intime",
    icon: "calendar_month",
    title: "Mon carnet",
    text: "Ton cycle et tes notes.",
    tone: "bg-secondary text-on-secondary",
  },
  {
    href: "/le-cercle",
    icon: "diversity_1",
    title: "Le Cercle",
    text: "Échange sous pseudo.",
    tone: "bg-tertiary text-on-tertiary",
  },
  {
    href: "/pass-sante",
    icon: "qr_code_2",
    title: "Pass Santé",
    text: "Consultations anonymes.",
    tone: "bg-sage text-white",
  },
];

export default function DashboardPage() {
  const { user } = useAppStore();
  const pseudonym = user.pseudonym || "toi";
  const [prediction, setPrediction] = useState<{
    currentDay: number;
    totalCycleLength: number;
    periodLength: number;
    phaseLabel: string;
    phaseSummary: string;
    daysUntilNextPeriod: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/cycle")
      .then((res) => res.json())
      .then((data) => setPrediction(data.prediction ?? null))
      .catch(() => {});
  }, []);

  return (
    <AuthGate>
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      <h1 className="font-display text-headline-lg sm:text-display text-on-surface tracking-tight font-bold">
        Bonjour, {pseudonym} 🌸
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md lg:gap-space-lg items-stretch">
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg border border-outline-variant/40">
          <MoodPicker
            onSave={(mood, symptoms) =>
              fetch("/api/cycle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "MOOD_LOG", mood, symptoms }),
              })
                .then((res) => res.ok)
                .catch(() => false)
            }
          />
        </div>

        <Link
          href="/carnet-intime"
          className="lg:col-span-5 bg-surface-container-low rounded-3xl p-space-md sm:p-space-lg border border-outline-variant/40 flex items-center gap-4 hover:shadow-soft transition-shadow"
        >
          {prediction ? (
            <>
              <CycleRing
                currentDay={prediction.currentDay}
                totalCycleLength={prediction.totalCycleLength}
                periodLength={prediction.periodLength}
                phaseLabel={prediction.phaseLabel}
                size="sm"
              />
              <span className="flex flex-col gap-1 min-w-0">
                <span className="font-label text-label-md text-tertiary">
                  {prediction.phaseLabel}
                </span>
                <span className="font-headline text-headline-sm text-on-surface font-bold">
                  Règles dans ~{prediction.daysUntilNextPeriod} jours
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  Estimation
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="w-14 h-14 shrink-0 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span aria-hidden="true" className="material-symbols-outlined text-[28px]">calendar_month</span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-headline text-headline-sm text-on-surface font-bold">
                  Suivre mon cycle
                </span>
                <span className="font-body text-body-md text-on-surface-variant">
                  Note tes dernières règles.
                </span>
              </span>
            </>
          )}
          <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-outline ml-auto">
            chevron_right
          </span>
        </Link>
      </div>

      <nav aria-label="Mes espaces" className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        {SPACES.map((space) => (
          <Link
            key={space.href}
            href={space.href}
            prefetch={false}
            className="group flex items-center gap-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 p-4 sm:p-5 hover:shadow-soft transition-shadow"
          >
            <span className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${space.tone}`}>
              <span aria-hidden="true" className="material-symbols-outlined text-[24px]">{space.icon}</span>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-headline text-headline-sm text-on-surface font-bold">
                {space.title}
              </span>
              <span className="block font-body text-body-md text-on-surface-variant">
                {space.text}
              </span>
            </span>
            <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-outline group-hover:text-primary transition-colors">
              arrow_forward
            </span>
          </Link>
        ))}
      </nav>

      <Link
        href="/sos-ecoute"
        className="rounded-3xl bg-tertiary-fixed/40 border border-tertiary-fixed-dim/50 p-4 sm:p-5 flex items-center gap-4 hover:shadow-soft transition-shadow"
      >
        <span className="w-12 h-12 shrink-0 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
          <span aria-hidden="true" className="material-symbols-outlined text-[24px]">support</span>
        </span>
        <span className="flex-1">
          <span className="block font-headline text-headline-sm text-on-surface font-bold">
            Besoin d&apos;aide maintenant ?
          </span>
          <span className="block font-body text-body-md text-on-surface-variant">
            Lignes d&apos;écoute gratuites.
          </span>
        </span>
        <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-tertiary">
          arrow_forward
        </span>
      </Link>
    </div>
    </AuthGate>
  );
}
