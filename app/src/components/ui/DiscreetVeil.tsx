"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export function DiscreetVeil() {
  const { isVeilActive, setVeilActive, liftVeil, isDiscreetMode } = useAppStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVeilActive(true);
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [setVeilActive]);

  // Keep body class synced with discreet mode
  useEffect(() => {
    if (isDiscreetMode) {
      document.documentElement.classList.add("discreet-active");
    } else {
      document.documentElement.classList.remove("discreet-active");
    }
  }, [isDiscreetMode]);

  if (!isVeilActive) return null;

  return (
    <div
      onClick={liftVeil}
      className="fixed inset-0 z-[100] veil-active flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-md bg-surface p-8 rounded-3xl shadow-xl border border-outline-variant/40 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">shield</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-headline-sm text-on-surface">
            Voile de discrétion activé
          </h2>
          <p className="font-body text-body-sm text-on-surface-variant">
            Par précaution, ton écran a été flouté après 2 minutes d&apos;inactivité
            pour préserver ton intimité.
          </p>
        </div>
        <button
          onClick={liftVeil}
          type="button"
          className="mt-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-container transition-all shadow-sm"
        >
          Toucher pour continuer
        </button>
      </div>
    </div>
  );
}

