"use client";

import { useCallback, useEffect } from "react";
import { PLATFORM_CONFIG } from "@/lib/constants";
import { useAppStore } from "@/lib/store";

export function EscapeButton() {
  const { clearLocalTraces } = useAppStore();

  const triggerEscape = useCallback(() => {
    // Clear in-memory / storage traces quickly and redirect immediately
    clearLocalTraces();
    window.location.replace(PLATFORM_CONFIG.safeExitUrl);
  }, [clearLocalTraces]);

  useEffect(() => {
    // Double press so that closing a dialog with Échap never ejects her by accident
    let lastEscape = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - lastEscape < 800) {
        triggerEscape();
      }
      lastEscape = now;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerEscape]);

  return (
    <button
      onClick={triggerEscape}
      type="button"
      aria-label="Sortie rapide : quitter Koko vers un site neutre"
      className="flex items-center gap-1.5 h-10 min-w-10 justify-center px-3 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-label text-label-md border border-outline-variant/30"
      title="Sortie rapide (Échap deux fois)"
    >
      <span aria-hidden="true" className="material-symbols-outlined text-[18px]">visibility_off</span>
      <span className="hidden sm:inline">Sortie rapide</span>
    </button>
  );
}

