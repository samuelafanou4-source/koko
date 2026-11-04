import Link from "next/link";
import { QuickExitShortcut } from "@/components/ui/EscapeButton";
import { Brand } from "./Brand";

/**
 * Header for logged-out visitors: logo, "Se connecter", "Créer mon espace".
 * No visible quick exit or SOS button here; double-Échap still works, and
 * emergency help stays reachable from the page body and the footer.
 */
export function PublicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/40">
      <QuickExitShortcut />
      <div className="h-16 md:h-20 max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-1">
        <Brand href="/" compact />

        <div className="flex items-center gap-1 sm:gap-space-sm">
          <Link
            href="/connexion"
            className="inline-flex items-center h-10 px-2 sm:px-4 rounded-full text-on-surface hover:bg-surface-container font-label text-label-sm sm:text-label-md whitespace-nowrap transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center h-10 px-3 sm:px-5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label text-label-sm sm:text-label-md whitespace-nowrap shadow-xs transition-colors"
          >
            Créer mon espace
          </Link>
        </div>
      </div>
    </header>
  );
}
