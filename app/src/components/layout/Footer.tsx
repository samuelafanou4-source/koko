"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export function Footer() {
  const { clearLocalTraces } = useAppStore();
  const [clearedToast, setClearedToast] = useState(false);

  const handleClearTraces = () => {
    clearLocalTraces();
    setClearedToast(true);
    setTimeout(() => setClearedToast(false), 3000);
  };

  return (
    <footer className="w-full bg-surface-container-low py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-outline-variant/20 mt-auto pb-20 md:pb-space-lg">
      <div className="max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col items-center justify-center text-center gap-space-xs">
        <div className="flex items-center gap-1.5 text-primary font-label text-label-md font-semibold">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span>Refuge sécurisé &amp; Anonyme</span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant max-w-xl">
          Plateforme chiffrée au repos et en transit • Conçue avec amour à Lomé pour ta sérénité • Aucun numéro ni nom de famille requis
        </p>

        {clearedToast && (
          <div className="bg-primary text-on-primary font-label text-label-sm px-3.5 py-1 rounded-full shadow-md animate-fadeIn">
            ✓ Traces locales et sessions temporaires effacées avec succès
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-space-md mt-1">
          <Link
            href="/charte"
            className="font-label text-label-sm text-on-surface-variant hover:text-on-surface transition-colors underline decoration-dotted"
          >
            Charte de discrétion
          </Link>
          <span className="text-outline-variant">•</span>
          <Link
            href="/sos-ecoute"
            className="font-label text-label-sm text-tertiary hover:underline transition-colors font-semibold"
          >
            Ligne d&apos;urgence Togo (1011)
          </Link>
          <span className="text-outline-variant">•</span>
          <button
            onClick={handleClearTraces}
            type="button"
            className="font-label text-label-sm text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
            title="Effacer le cache et les données de session stockées dans ce navigateur"
          >
            <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
            <span>Effacer les traces locales</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

