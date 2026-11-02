"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EMERGENCY_CONTACTS } from "@/lib/constants";

export default function SosEcoutePage() {
  // Guided breathing exercise: 4s inhale, 4s hold, 4s exhale
  const [breathingPhase, setBreathingPhase] = useState<
    "INSPIRE" | "GARDE" | "EXPIRE"
  >("INSPIRE");
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        setBreathingPhase((current) => {
          if (current === "INSPIRE") return "GARDE";
          if (current === "GARDE") return "EXPIRE";
          return "INSPIRE";
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const phaseDetails = {
    INSPIRE: {
      text: "Inspire doucement par le nez...",
      scale: "scale-125",
      color: "bg-primary-fixed/40 text-primary",
    },
    GARDE: {
      text: "Garde l'air tranquillement...",
      scale: "scale-125",
      color: "bg-secondary-fixed/50 text-secondary",
    },
    EXPIRE: {
      text: "Expire lentement par la bouche...",
      scale: "scale-90",
      color: "bg-tertiary-fixed/50 text-tertiary",
    },
  }[breathingPhase];

  return (
    <div className="w-full max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md md:py-space-lg flex flex-col gap-space-lg">
      {/* Warm Compassionate Header */}
      <div className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-tertiary-fixed/35 p-space-md sm:p-space-lg md:p-space-xl border border-tertiary/20 flex flex-col items-center text-center gap-4 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[28px]">support</span>
        </div>

        <div className="flex flex-col gap-1.5 max-w-xl">
          <span className="font-label text-label-sm uppercase tracking-wider text-tertiary font-bold">
            Sanctuaire de Secours &amp; Soutien
          </span>
          <h1 className="font-display text-display text-on-surface font-bold">
            Tu n&apos;es pas seule.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            Quelle que soit l&apos;épreuve ou l&apos;angoisse que tu traverses, il y a
            des personnes bienveillantes prêtes à t&apos;écouter au Togo sans aucun
            jugement et dans le secret le plus absolu.
          </p>
        </div>
      </div>

      {/* Interactive Guided Breathing Support */}
      <div className="rounded-2xl bg-surface-container-lowest p-6 md:p-8 shadow-xs border border-outline-variant/30 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <span className="font-label text-label-xs uppercase tracking-wider text-primary font-bold">
            Apaisement immédiat
          </span>
          <h2 className="font-headline text-headline-sm text-on-surface font-bold">
            Respire avec Koko
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant max-w-md">
            Pose tes mains sur tes genoux ou ton ventre. Suis le cercle pour
            apaiser ton rythme cardiaque.
          </p>
        </div>

        {/* Breathing Animated Circle */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-inner ${phaseDetails.scale} ${phaseDetails.color}`}
          >
            <span className="font-headline text-headline-lg font-bold">
              {countdown}s
            </span>
            <span className="font-label text-label-xs font-semibold uppercase mt-0.5">
              {breathingPhase}
            </span>
          </div>
        </div>

        <p className="font-body text-body-md text-on-surface font-semibold animate-fadeIn">
          {phaseDetails.text}
        </p>
      </div>

      {/* Emergency Phone Lines in Togo */}
      <div className="flex flex-col gap-1">
        <span className="font-label text-label-sm text-tertiary uppercase tracking-wider font-semibold">
          Lignes d&apos;écoute &amp; Urgences médicales
        </span>
        <h2 className="font-headline text-headline-lg text-on-surface font-bold">
          Qui peux-tu contacter immédiatement ?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* National Emergency: 1011 */}
        <div className="rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">call</span>
            </div>
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">
              {EMERGENCY_CONTACTS.nationalEmergencyNumber}
            </h3>
            <span className="font-label text-label-xs text-tertiary uppercase font-semibold">
              {EMERGENCY_CONTACTS.nationalEmergencyNote}
            </span>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              Ligne nationale d&apos;assistance d&apos;urgence au Togo. Pour les
              situations de détresse, violences ou besoin d&apos;intervention rapide.
            </p>
          </div>

          <a
            href={`tel:${EMERGENCY_CONTACTS.nationalEmergencyNumber}`}
            className="w-full py-3 rounded-full bg-tertiary text-on-tertiary font-label text-label-md font-semibold text-center hover:bg-tertiary-container transition-colors shadow-xs"
          >
            Appeler le {EMERGENCY_CONTACTS.nationalEmergencyNumber}
          </a>
        </div>

        {/* Ligne Verte Ecoute Santé Sexuelle */}
        <div className="rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                volunteer_activism
              </span>
            </div>
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">
              {EMERGENCY_CONTACTS.ligneVerteEcoute}
            </h3>
            <span className="font-label text-label-xs text-primary uppercase font-semibold">
              {EMERGENCY_CONTACTS.ligneVerteNote}
            </span>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              Ligne Verte confidentielle dédiée à la santé sexuelle, la
              contraception d&apos;urgence et le soutien psychologique.
            </p>
          </div>

          <a
            href={`tel:${EMERGENCY_CONTACTS.ligneVerteEcoute}`}
            className="w-full py-3 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold text-center hover:bg-primary-container transition-colors shadow-xs"
          >
            Appeler la Ligne Verte
          </a>
        </div>

        {/* CHU Sylvanus Olympio Lomé */}
        <div className="rounded-t-[2.5rem] rounded-b-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                local_hospital
              </span>
            </div>
            <h3 className="font-headline text-headline-sm text-on-surface font-bold">
              CHU Tokoin (Lomé)
            </h3>
            <span className="font-label text-label-xs text-secondary uppercase font-semibold">
              Urgences médicales &amp; Soins
            </span>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              CHU Sylvanus Olympio, service d&apos;urgence générale et gynécologique.
              Accès 24h/24 en cas de douleur aiguë ou hémorragie.
            </p>
          </div>

          <a
            href={`tel:${EMERGENCY_CONTACTS.chuLomeUrgence}`}
            className="w-full py-3 rounded-full bg-secondary text-on-secondary font-label text-label-md font-semibold text-center hover:bg-secondary/90 transition-colors shadow-xs"
          >
            {EMERGENCY_CONTACTS.chuLomeUrgence}
          </a>
        </div>
      </div>

      {/* Redirect to Pass Santé */}
      <div className="rounded-2xl bg-surface-container p-6 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]">
            location_on
          </span>
          <div className="flex flex-col">
            <div className="font-headline text-headline-sm text-on-surface font-bold">
              Tu préfères consulter en personne ?
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              Le Pass Santé te donnera un bon anonyme pour les centres qui ont
              signé une convention avec Koko.
            </p>
          </div>
        </div>
        <Link
          href="/pass-sante"
          className="px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-colors whitespace-nowrap shadow-xs"
        >
          Ouvrir le Pass Santé
        </Link>
      </div>
    </div>
  );
}

