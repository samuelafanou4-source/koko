import Link from "next/link";
import { EMERGENCY_CONTACTS } from "@/lib/constants";

interface ErrorScreenProps {
  title: string;
  message: string;
  /** Shown only when a retry makes sense (error boundaries). */
  onRetry?: () => void;
  homeHref?: string;
  homeLabel?: string;
  /** Short reference she can give to the team (Next.js digest), never a message. */
  reference?: string;
}

/**
 * Calm full-page message, Koko design system. No stack trace, no internal
 * message, no user data. The SOS link always stays visible.
 */
export function ErrorScreen({
  title,
  message,
  onRetry,
  homeHref = "/",
  homeLabel = "Retour à l'accueil",
  reference,
}: ErrorScreenProps) {
  return (
    <div className="w-full max-w-[560px] mx-auto px-margin py-space-xl flex flex-col items-center text-center gap-6">
      <div
        aria-hidden="true"
        className="w-20 h-20 rounded-t-full rounded-b-3xl bg-primary-fixed/40 text-primary flex items-center justify-center text-3xl shadow-xs"
      >
        🌿
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-headline-lg md:text-display text-on-surface font-bold">{title}</h1>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{message}</p>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-container transition-colors shadow-xs"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">refresh</span>
            Réessayer
          </button>
        )}
        <Link
          href={homeHref}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant font-label text-label-lg hover:border-primary/50 hover:text-primary transition-colors"
        >
          {homeLabel}
        </Link>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 p-4 rounded-2xl bg-tertiary-fixed/40 border border-tertiary-fixed-dim/50">
        <p className="font-body text-body-sm text-on-surface">Besoin d&apos;aide maintenant ?</p>
        <Link
          href="/sos-ecoute"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-tertiary text-on-tertiary font-label text-label-md"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">call</span>
          SOS · {EMERGENCY_CONTACTS.nationalEmergencyNumber}
        </Link>
      </div>

      {reference && (
        <p className="font-label text-label-sm text-on-surface-variant">
          Référence : <span className="font-mono">{reference}</span>
        </p>
      )}
    </div>
  );
}
