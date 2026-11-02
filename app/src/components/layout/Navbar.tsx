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
    { label: "Assistant Koko", href: "/assistant-koko" },
    { label: "Carnet Intime", href: "/carnet-intime" },
    { label: "Le Cercle", href: "/le-cercle" },
    { label: "Pass Santé", href: "/pass-sante" },
  ];

  const currentPseudo = user.pseudonym || "Invitée";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 md:h-20 max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-sm">
        {/* Brand */}
        <div className="flex items-center gap-space-md">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Architectural Arch Logo Icon */}
            <div className="w-9 h-9 rounded-full bg-primary-fixed/40 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
              <svg
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
            <div className="flex flex-col">
              <span className="font-headline text-headline-sm text-primary tracking-tight leading-none font-bold">
                Koko
              </span>
              <span className="font-label text-label-sm text-on-surface-variant font-normal leading-none mt-1 hidden sm:inline-block">
                Espace bien-être intime
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-space-xs bg-surface-container-low px-space-xs py-1 rounded-full ml-space-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-space-md py-1.5 transition-all rounded-full font-label text-label-md ${
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary hover:text-on-tertiary transition-all font-label text-label-md whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span className="font-semibold">SOS Écoute</span>
          </Link>

          <div className="h-6 w-px bg-surface-container-highest mx-0.5 hidden sm:block" />

          {/* User Pseudonym Badge */}
          <Link
            href="/onboarding"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label text-label-sm hover:bg-secondary-container/60 transition-colors"
            title="Modifier mon pseudonyme poétique"
          >
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>🌸 {currentPseudo}</span>
          </Link>

          {/* Parameters & Privacy */}
          <Link
            href="/parametres"
            className="hidden sm:flex w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            title="Confidentialité & Paramètres"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </Link>

          {/* Account status icon */}
          <Link
            href={user.isAuthenticated ? "/parametres" : "/connexion"}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary"
            title={user.isAuthenticated ? "Mon Profil" : "Se connecter"}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>
        </div>
      </div>

      {/* Tablet tabs (mobile uses the bottom nav instead) */}
      <div className="hidden md:flex lg:hidden items-center justify-around bg-surface-container-low/70 py-1.5 px-margin border-t border-outline-variant/10">
        <nav className="flex items-center justify-between w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-full font-label text-label-sm transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

