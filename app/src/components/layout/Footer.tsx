"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export function Footer({ withBottomNav = false }: { withBottomNav?: boolean }) {
  const { clearLocalTraces } = useAppStore();
  const [clearedToast, setClearedToast] = useState(false);

  const handleClearTraces = () => {
    clearLocalTraces();
    setClearedToast(true);
    setTimeout(() => setClearedToast(false), 3000);
  };

  return (
    <footer className={`w-full bg-surface-container-low py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-outline-variant/20 mt-auto ${withBottomNav ? "pb-20" : ""} md:pb-space-lg`}>
      <div className="max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col items-center justify-center text-center gap-space-xs">
        <p className="flex items-center gap-1.5 text-on-surface-variant font-label text-label-md">
          <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary">shield</span>
          Anonyme et chiffré. Fait à Lomé.
        </p>

        {clearedToast && (
          <div className="bg-primary text-on-primary font-label text-label-sm px-3.5 py-1 rounded-full shadow-md animate-fadeIn">
            ✓ Traces effacées
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-space-md mt-1">
          <Link
            href="/charte"
            className="font-label text-label-md text-on-surface-variant hover:text-on-surface transition-colors underline py-2"
          >
            Confidentialité
          </Link>
          <span className="text-outline-variant">•</span>
          <Link
            href="/sos-ecoute"
            className="font-label text-label-md text-tertiary hover:underline transition-colors font-semibold py-2"
          >
            Urgence : 1011
          </Link>
          <span className="text-outline-variant">•</span>
          <button
            onClick={handleClearTraces}
            type="button"
            className="font-label text-label-md text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 py-2"
            title="Effacer le cache et les données de session stockées dans ce navigateur"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">delete_sweep</span>
            <span>Effacer mes traces</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

