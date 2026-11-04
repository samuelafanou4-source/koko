import Link from "next/link";

/**
 * Arch logo + "Koko" wordmark.
 * `compact`: smaller on phones, wordmark hidden under 340px (tiny screens),
 * so that two text buttons fit next to it.
 */
export function Brand({ href, compact = false }: { href: string; compact?: boolean }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`flex items-center group shrink-0 ${compact ? "gap-2 sm:gap-2.5" : "gap-2.5"}`}
      aria-label="Koko, accueil"
    >
      <div className={`${compact ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9"} rounded-full bg-primary-fixed/40 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105`}>
        <svg aria-hidden="true" viewBox="0 0 100 120" className="w-full h-full text-primary" fill="none">
          <path
            d="M15 110V50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50V110"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="62" cy="72" r="6" fill="#d98e73" />
        </svg>
      </div>
      <span
        className={`font-headline text-headline-sm text-primary tracking-tight font-bold ${
          compact ? "max-[339px]:hidden" : ""
        }`}
      >
        Koko
      </span>
    </Link>
  );
}

/** SOS button: always visible, logged in or not. */
export function SosLink() {
  return (
    <Link
      href="/sos-ecoute"
      aria-label="SOS : aide et écoute immédiate"
      className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary hover:text-on-tertiary transition-all font-label text-label-md whitespace-nowrap"
    >
      <span aria-hidden="true" className="material-symbols-outlined text-[18px]">call</span>
      <span className="font-semibold">SOS</span>
    </Link>
  );
}
