"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EscapeButton } from "@/components/ui/EscapeButton";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAppStore();

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Assistant", href: "/assistant-koko" },
    { label: "Carnet", href: "/carnet-intime" },
    { label: "Cercle", href: "/le-cercle" },
    { label: "Pass Santé", href: "/pass-sante" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 md:h-20 max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-sm">
        {/* Brand */}
        <div className="flex items-center gap-space-md">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Koko, accueil">
            {/* Architectural Arch Logo Icon */}
            <div className="w-9 h-9 rounded-full bg-primary-fixed/40 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 120"
                className="w-full h-full text-primary"
                fill="none"
              >
                <path
                  d="M15 110V50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50V110"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="62" cy="72" r="6" fill="#d98e73" />
              </svg>
            </div>
            <span className="font-headline text-headline-sm text-primary tracking-tight font-bold">
              Koko
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-space-xs bg-surface-container-low px-space-xs py-1 rounded-full ml-space-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  // No prefetch: a prefetched redirect to /connexion stays cached after login
                  prefetch={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-space-md py-2 transition-all rounded-full font-label text-label-md ${
                    isActive
                      ? "bg-primary-container text-on-primary-container font-semibold shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-xs md:gap-space-sm">
          {/* Quick escape button */}
          <EscapeButton />

          {/* SOS Écoute */}
          <Link
            href="/sos-ecoute"
            aria-label="SOS : aide et écoute immédiate"
            className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary hover:text-on-tertiary transition-all font-label text-label-md whitespace-nowrap"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">call</span>
            <span className="font-semibold">SOS</span>
          </Link>

          {/* Account: settings when logged in, login otherwise */}
          <Link
            href={user.isAuthenticated ? "/parametres" : "/connexion"}
            aria-label={user.isAuthenticated ? "Mon compte et paramètres" : "Se connecter"}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">person</span>
          </Link>
        </div>
      </div>

      {/* Tablet tabs (mobile uses the bottom nav instead) */}
      <div className="hidden md:flex lg:hidden items-center justify-around bg-surface-container-low/70 py-1.5 px-margin border-t border-outline-variant/10">
        <nav aria-label="Navigation principale" className="flex items-center justify-between w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                // No prefetch: a prefetched redirect to /connexion stays cached after login
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1.5 rounded-full font-label text-label-md transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

