"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EscapeButton } from "@/components/ui/EscapeButton";
import { Brand, SosLink } from "./Brand";
import { UserMenu } from "./UserMenu";
import { PLATFORM_LINKS, isActiveLink } from "./platform-links";

/** Header of the logged-in platform. */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 md:h-20 max-w-[1120px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-md">
          <Brand href="/tableau-de-bord" />

          {/* Desktop Nav */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-space-xs bg-surface-container-low px-space-xs py-1 rounded-full ml-space-sm">
            {PLATFORM_LINKS.map((link) => {
              const isActive = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
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

        <div className="flex items-center gap-space-xs md:gap-space-sm">
          <EscapeButton />
          <SosLink />
          <UserMenu />
        </div>
      </div>

      {/* Tablet tabs (mobile uses the bottom nav instead) */}
      <div className="hidden md:flex lg:hidden items-center justify-around bg-surface-container-low/70 py-1.5 px-margin border-t border-outline-variant/10">
        <nav aria-label="Navigation principale" className="flex items-center justify-between w-full">
          {PLATFORM_LINKS.map((link) => {
            const isActive = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
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
