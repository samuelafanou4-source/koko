"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { CycleRing } from "@/components/ui/CycleRing";
import { MoodPicker } from "@/components/ui/MoodPicker";
import { AuthGate } from "@/components/auth/AuthGate";

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
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg md:gap-space-xl">
      {/* Top Greeting Section with Arch Accent */}
      <div className="relative overflow-hidden bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl p-space-md sm:p-space-lg md:p-space-xl shadow-xs border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        {/* Botanical SVG motif */}
        <div className="absolute -right-8 -bottom-10 pointer-events-none opacity-20 w-48 h-48 md:w-64 md:h-64 text-primary">
          <svg className="w-full h-full" fill="none" viewBox="0 0 200 200">
            <path
              d="M100 10C100 10 140 60 140 100C140 140 100 190 100 190C100 190 60 140 60 100C60 60 100 10V10Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            <circle cx="100" cy="100" fill="#a6634b" fillOpacity="0.3" r="14" />
          </svg>
        </div>

        <div className="flex flex-col gap-1.5 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed-variant font-label text-label-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Espace 100% anonyme &amp; chiffré</span>
          </div>
          <h1 className="font-headline text-headline-lg sm:font-display sm:text-display text-on-surface tracking-tight mt-1 font-bold">
            Bonjour, {pseudonym} 🌸
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Heureuse de te retrouver dans ton cocon protecteur. Comment te sens-tu
            aujourd’hui ?
          </p>
        </div>

        {/* Quick status pill */}
        <div className="z-10 flex items-center gap-3 bg-surface rounded-full px-4 py-2 self-start md:self-auto shadow-xs border border-outline-variant/30">
          <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[20px]">
              verified_user
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label text-label-sm text-on-surface-variant">
              Session Discrète
            </span>
            <span className="font-label text-label-md text-primary font-semibold">
              Aucune donnée partagée
            </span>
          </div>
        </div>
      </div>

      {/* Dual Row: Mood Widget & Cycle Snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md lg:gap-space-lg items-stretch">
        {/* Mood Widget (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between gap-space-md">
          <MoodPicker
            onSave={(mood, symptoms) => {
              fetch("/api/cycle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "MOOD_LOG", mood, symptoms }),
              }).catch(() => {});
            }}
          />
        </div>

        {/* Quick Cycle Snippet Card (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-t-[2.5rem] rounded-b-2xl p-space-md sm:p-space-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between gap-space-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-label text-label-sm px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-semibold">
              Ici, personne ne te juge
            </span>
            <Link
              href="/carnet-intime"
              className="text-primary hover:text-primary-container font-label text-label-sm flex items-center gap-0.5 transition-colors font-semibold"
            >
              Détails{" "}
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
            </Link>
          </div>

          {prediction ? (
            <div className="flex items-center gap-4 sm:gap-6 py-2">
              <CycleRing
                currentDay={prediction.currentDay}
                totalCycleLength={prediction.totalCycleLength}
                periodLength={prediction.periodLength}
                phaseLabel={prediction.phaseLabel}
                size="sm"
              />
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-label text-label-md font-semibold text-tertiary">
                  {prediction.phaseLabel}
                </span>
                <h3 className="font-headline text-headline-sm text-on-surface leading-snug font-bold">
                  {prediction.phaseSummary}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Prochaines règles estimées dans environ{" "}
                  <strong className="text-on-surface">
                    {prediction.daysUntilNextPeriod} jours
                  </strong>
                  .
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 py-2">
              <h3 className="font-headline text-headline-sm text-on-surface font-bold">
                Commence ton suivi de cycle
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant">
                Note la date de début de tes dernières règles dans ton carnet pour
                voir tes estimations ici.
              </p>
              <Link
                href="/carnet-intime"
                className="self-start mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-container transition-colors"
              >
                Noter mes règles
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Daily Affirmation Arch Quote */}
      <div className="w-full rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-high/60 px-space-md py-space-md sm:px-space-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary-container/60 text-secondary shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">
              format_quote
            </span>
          </div>
          <p className="font-body text-body-md text-on-surface italic">
            « Ton corps est ton foyer le plus précieux. Écoute-le à son propre rythme. »
          </p>
        </div>
        <span className="font-label text-label-sm text-on-surface-variant shrink-0 bg-surface rounded-full px-3 py-1 font-semibold">
          Pensée bienveillante du jour
        </span>
      </div>

      {/* 4 Core Features */}
      <div className="flex flex-col gap-1">
        <span className="font-label text-label-sm text-primary tracking-wider uppercase font-semibold">
          Refuges &amp; Outils
        </span>
        <h2 className="font-headline text-headline-lg text-on-surface font-bold">
          Tes espaces d’accompagnement
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md lg:gap-space-lg">
        {/* Card 1: Parler à Koko */}
        <div className="group relative rounded-t-[2.5rem] rounded-b-2xl bg-primary-fixed/25 p-space-lg flex flex-col justify-between gap-space-md transition-all duration-300 hover:shadow-md hover:bg-primary-fixed/35 border border-primary/20">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[26px]">
                  chat_bubble
                </span>
              </div>
              <span className="font-label text-label-sm px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-semibold">
                Guide IA 24h/24 &amp; Discret
              </span>
            </div>
            <h3 className="font-headline text-headline-md text-on-surface font-bold group-hover:text-primary transition-colors">
              Parler à Koko
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Une question intime, une inquiétude ou un doute après un rapport ? Koko
              répond avec douceur, rigueur et sans aucun jugement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">
                lock_clock
              </span>
              <span>Historique auto-effaçable</span>
            </div>
            <Link
              href="/assistant-koko"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg font-semibold shadow-xs hover:bg-primary-container transition-colors"
            >
              <span>Ouvrir la conversation</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Card 2: Mon Carnet Intime */}
        <div className="group relative rounded-t-[2.5rem] rounded-b-2xl bg-secondary-container/30 p-space-lg flex flex-col justify-between gap-space-md transition-all duration-300 hover:shadow-md hover:bg-secondary-container/45 border border-secondary/20">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[26px]">
                  calendar_today
                </span>
              </div>
              <span className="font-label text-label-sm px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                Suivi Personnel
              </span>
            </div>
            <h3 className="font-headline text-headline-md text-on-surface font-bold group-hover:text-secondary transition-colors">
              Mon Carnet Intime
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Calendrier menstruel doux, prévisions d’ovulation, notes de symptômes
              et notes chiffrées que toi seule peux lire.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                lock
              </span>
              <span>Notes chiffrées</span>
            </div>
            <Link
              href="/carnet-intime"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary text-on-secondary font-label text-label-lg font-semibold shadow-xs hover:bg-secondary/90 transition-colors"
            >
              <span>Consulter mon carnet</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Card 3: Le Cercle Bienveillant */}
        <div className="group relative rounded-t-[2.5rem] rounded-b-2xl bg-tertiary-fixed/35 p-space-lg flex flex-col justify-between gap-space-md transition-all duration-300 hover:shadow-md hover:bg-tertiary-fixed/50 border border-tertiary/20">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[26px]">
                  diversity_1
                </span>
              </div>
              <span className="font-label text-label-sm px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-semibold">
                Entraide &amp; Sœurité
              </span>
            </div>
            <h3 className="font-headline text-headline-md text-on-surface font-bold group-hover:text-tertiary transition-colors">
              Le Cercle Bienveillant
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Forum 100% anonyme entre jeunes femmes et étudiantes au Togo. Échange
              sans tabou. Chaque message est relu avant publication.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                check_circle
              </span>
              <span>Modéré avec bienveillance</span>
            </div>
            <Link
              href="/le-cercle"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-lg font-semibold shadow-xs hover:bg-tertiary-container transition-colors"
            >
              <span>Rejoindre les discussions</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Card 4: Pass Santé Partenaire */}
        <div className="group relative rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-high p-space-lg flex flex-col justify-between gap-space-md transition-all duration-300 hover:shadow-md hover:bg-surface-variant border border-outline-variant/30">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[26px]">
                  local_hospital
                </span>
              </div>
              <span className="font-label text-label-sm px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-semibold">
                Réseau &quot;Girl-Friendly&quot;
              </span>
            </div>
            <h3 className="font-headline text-headline-md text-on-surface font-bold group-hover:text-primary transition-colors">
              Pass Santé
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Un bon de consultation anonyme, valable dans les centres de santé qui
              ont signé une convention avec Koko. Seuls les centres vérifiés y
              apparaissent.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">
                qr_code
              </span>
              <span>Code QR sans ton identité</span>
            </div>
            <Link
              href="/pass-sante"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-container text-on-primary-container font-label text-label-lg font-semibold shadow-xs hover:bg-primary hover:text-on-primary transition-colors"
            >
              <span>Ouvrir le Pass Santé</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* SOS Immediate Support Card */}
      <div className="rounded-2xl bg-tertiary-fixed/30 p-space-md sm:p-space-lg shadow-xs border border-tertiary-container/30 flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container shrink-0 flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[24px]">
              support_agent
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">
              Besoin d’une écoute urgente ou d’un conseil médical immédiat ?
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant">
              Des lignes d&apos;écoute gratuites et confidentielles au Togo, et un
              exercice de respiration pour t&apos;apaiser tout de suite.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Link
            href="/sos-ecoute"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-lg font-semibold shadow-xs hover:bg-tertiary-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Contacter SOS Écoute</span>
          </Link>
        </div>
      </div>
    </div>
    </AuthGate>
  );
}

