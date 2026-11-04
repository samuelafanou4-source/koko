"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSessionUser } from "@/components/auth/SessionProvider";
import { logoutEverywhere } from "@/lib/client-session";

/** Pseudonym button with a small menu: Paramètres, (Modération), Se déconnecter. */
export function UserMenu() {
  const { pseudonym, role } = useSessionUser();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isStaff = role === "MODERATOR" || role === "ADMIN";

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = async () => {
    setLeaving(true);
    await logoutEverywhere();
  };

  const itemClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-label text-label-md text-on-surface hover:bg-surface-container transition-colors text-left";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Mon compte (${pseudonym})`}
        className="flex items-center gap-2 h-10 pl-1 pr-1 md:pr-3 rounded-full bg-surface-container-low border border-outline-variant/40 hover:bg-surface-container transition-colors"
      >
        <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">person</span>
        </span>
        <span className="hidden md:inline max-w-[9rem] truncate font-label text-label-md text-on-surface">
          {pseudonym}
        </span>
        <span aria-hidden="true" className="hidden md:inline material-symbols-outlined text-[18px] text-on-surface-variant">
          expand_more
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Mon compte"
          className="absolute right-0 mt-2 w-60 p-2 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-soft animate-fadeIn"
        >
          <p className="px-4 pt-2 pb-3 font-body text-body-sm text-on-surface-variant border-b border-outline-variant/30 mb-1 truncate">
            Connectée en tant que{" "}
            <strong className="text-on-surface">{pseudonym}</strong>
          </p>
          <Link role="menuitem" href="/parametres" prefetch={false} onClick={() => setOpen(false)} className={itemClass}>
            <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-primary">settings</span>
            Paramètres
          </Link>
          {isStaff && (
            <Link role="menuitem" href="/moderation" prefetch={false} onClick={() => setOpen(false)} className={itemClass}>
              <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-primary">shield_person</span>
              Modération
            </Link>
          )}
          <button
            role="menuitem"
            type="button"
            onClick={handleLogout}
            disabled={leaving}
            className={`${itemClass} disabled:opacity-60`}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-tertiary">logout</span>
            {leaving ? "Déconnexion…" : "Se déconnecter"}
          </button>
        </div>
      )}
    </div>
  );
}
