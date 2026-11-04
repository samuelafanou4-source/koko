"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLATFORM_LINKS, isActiveLink } from "./platform-links";

/** Mobile tab bar, platform only. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/40 md:hidden pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] px-2 flex items-center justify-around"
    >
      {PLATFORM_LINKS.map((tab) => {
        const isActive = isActiveLink(pathname, tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            prefetch={false}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              isActive
                ? "text-primary font-bold bg-primary-fixed/50"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span
              aria-hidden="true"
              className={`material-symbols-outlined text-[22px] ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              {tab.icon}
            </span>
            <span className="font-label text-label-sm leading-tight mt-0.5">{tab.short}</span>
          </Link>
        );
      })}
    </nav>
  );
}
