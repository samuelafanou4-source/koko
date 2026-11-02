"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { DiscreetVeil } from "@/components/ui/DiscreetVeil";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { useAppStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showHelper, setShowHelper] = useState(false);
  const { setUser, setDiscreetMode } = useAppStore();

  useEffect(() => {
    // Show quick exit hint briefly on first load
    const dismissed = sessionStorage.getItem("koko_hint_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShowHelper(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    try {
      setDiscreetMode(window.localStorage.getItem("koko_discreet_mode") === "1");
    } catch {
      // Preference only.
    }
  }, [setDiscreetMode]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.user) {
          setUser({
            pseudonym: data.user.pseudonym,
            anonId: data.user.anonId,
            role: data.user.role,
            isAuthenticated: true,
          });
        }
      })
      .catch(() => {});
  }, [setUser]);

  const dismissHelper = () => {
    setShowHelper(false);
    sessionStorage.setItem("koko_hint_dismissed", "true");
  };

  return (
    <>
      <ServiceWorkerRegister />
      <Navbar />

      <main className="w-full pt-16 md:pt-[7.5rem] lg:pt-20 bg-surface min-h-[calc(100vh-140px)] flex flex-col flex-1">
        {children}
      </main>

      <Footer />
      <BottomNav />
      <DiscreetVeil />

      {/* One-time hint about the quick exit button */}
      {showHelper && (
        <aside
          aria-label="Astuce discrétion"
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto z-40 md:max-w-xs animate-slideUp"
        >
          <div className="bg-surface-container-lowest p-3 pl-4 rounded-2xl shadow-soft border border-outline-variant/50 flex items-center gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-[22px] text-primary">
              visibility_off
            </span>
            <p className="font-body text-body-sm text-on-surface flex-1">
              Quelqu&apos;un arrive ? Touche l&apos;œil en haut pour tout cacher.
            </p>
            <button
              onClick={dismissHelper}
              type="button"
              aria-label="Fermer l'astuce"
              className="w-10 h-10 shrink-0 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

