import Link from "next/link";
import { EscapeButton } from "@/components/ui/EscapeButton";
import { Brand, SosLink } from "./Brand";

/** Header for logged-out visitors. */
export function PublicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 md:h-20 max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-sm">
        <Brand href="/" />

        <div className="flex items-center gap-space-xs md:gap-space-sm">
          <EscapeButton />
          <SosLink />
          <Link
            href="/connexion"
            className="hidden sm:inline-flex items-center h-10 px-4 rounded-full text-on-surface hover:bg-surface-container font-label text-label-md whitespace-nowrap transition-colors"
          >
            Se connecter
          </Link>
          {/* Mobile: one compact icon for login */}
          <Link
            href="/connexion"
            aria-label="Se connecter"
            className="sm:hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">person</span>
          </Link>
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label text-label-md whitespace-nowrap shadow-xs transition-colors"
          >
            Créer mon espace
          </Link>
        </div>
      </div>
    </header>
  );
}
