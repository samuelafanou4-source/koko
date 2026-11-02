"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: "Accueil", href: "/", icon: "home" },
    { label: "Assistant", href: "/assistant-koko", icon: "chat_bubble" },
    { label: "Carnet", href: "/carnet-intime", icon: "calendar_today" },
    { label: "Cercle", href: "/le-cercle", icon: "diversity_1" },
    { label: "Pass", href: "/pass-sante", icon: "qr_code" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/40 md:hidden pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] px-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            // No prefetch: a prefetched redirect to /connexion stays cached after login
            prefetch={false}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              isActive
                ? "text-primary font-bold bg-primary-fixed/50"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span aria-hidden="true"
              className={`material-symbols-outlined text-[22px] ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              {tab.icon}
            </span>
            <span className="font-label text-label-sm leading-tight mt-0.5">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

