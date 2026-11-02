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

      {/* Floating Discreet Mode Helper Toast from Stitch design */}
      {showHelper && (
        <aside
          aria-label="Aide mode discret"
          className="fixed bottom-16 md:bottom-6 right-4 z-40 max-w-xs transition-all duration-300 animate-slideUp"
        >
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xl border border-outline-variant/40 flex items-start gap-3 relative">
            <button
              onClick={dismissHelper}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center font-bold text-xs"
              title="Fermer"
              type="button"
            >
              ✕
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">security</span>
            </div>
            <div className="pr-2">
              <div className="font-label text-label-md text-on-surface font-semibold mb-0.5">
                Mode Discret disponible
              </div>
              <p className="font-body text-body-sm text-on-surface-variant leading-tight">
                Un proche approche ? Appuie sur{" "}
                <span className="hidden md:inline">
                  <strong className="text-on-surface font-semibold">Échap deux fois</strong>{" "}
                  ou{" "}
                </span>
                le bouton œil en haut pour masquer l&apos;écran immédiatement.
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

