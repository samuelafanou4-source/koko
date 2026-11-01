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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerEscape]);

  return (
    <button
      onClick={triggerEscape}
      type="button"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-label text-label-sm border border-outline-variant/30"
      title="Sortie d'urgence : masque l'écran et redirige vers un site neutre (Raccourci : touche Échap)"
    >
      <span className="material-symbols-outlined text-[16px]">visibility_off</span>
      <span className="hidden sm:inline">Sortie rapide</span>
      <kbd className="hidden md:inline-block px-1 py-0.5 text-[9px] bg-surface rounded text-on-surface-variant font-mono">
        Échap
      </kbd>
    </button>
  );
}

