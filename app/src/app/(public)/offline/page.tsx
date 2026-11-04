import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hors ligne — Koko",
  robots: { index: false, follow: false },
};
import { EMERGENCY_CONTACTS } from "@/lib/constants";

export default function OfflinePage() {
  return (
    <div className="w-full max-w-[600px] mx-auto px-margin py-space-xl flex flex-col items-center text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center text-3xl shadow-xs">
        🌿
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-display text-on-surface font-bold">
          Tu es hors ligne
        </h1>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          Ta connexion internet semble interrompue. Pour ta sécurité, tes numéros
          d&apos;urgence restent accessibles directement sur ton téléphone.
        </p>
      </div>

      {/* Offline Emergency Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-6 border border-outline-variant/30 flex flex-col gap-3 text-left">
        <div className="font-headline text-headline-sm text-tertiary font-bold flex items-center gap-2">
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">support</span>
          <span>Numéros d&apos;appel directs :</span>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={`tel:${EMERGENCY_CONTACTS.nationalEmergencyNumber}`}
            className="p-3 rounded-xl bg-tertiary text-on-tertiary font-label text-label-md font-semibold flex items-center justify-between"
          >
            <span>Ligne d&apos;urgence nationale</span>
            <span className="font-mono">{EMERGENCY_CONTACTS.nationalEmergencyNumber}</span>
          </a>
          <a
            href={`tel:${EMERGENCY_CONTACTS.ligneVerteEcoute}`}
            className="p-3 rounded-xl bg-surface-container-lowest text-on-surface font-label text-label-md font-semibold flex items-center justify-between border border-outline-variant/30"
          >
            <span>Ligne Verte Écoute Santé Sexuelle</span>
            <span className="font-mono">{EMERGENCY_CONTACTS.ligneVerteEcoute}</span>
          </a>
        </div>
      </div>

      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md font-semibold hover:bg-primary-container transition-all shadow-xs"
      >
        Réessayer la connexion
      </Link>
    </div>
  );
}

