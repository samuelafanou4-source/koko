export const PLATFORM_LINKS = [
  { label: "Accueil", short: "Accueil", href: "/tableau-de-bord", icon: "home" },
  { label: "Assistant", short: "Assistant", href: "/assistant-koko", icon: "chat_bubble" },
  { label: "Carnet", short: "Carnet", href: "/carnet-intime", icon: "calendar_today" },
  { label: "Cercle", short: "Cercle", href: "/le-cercle", icon: "diversity_1" },
  { label: "Pass Santé", short: "Pass", href: "/pass-sante", icon: "qr_code" },
] as const;

export function isActiveLink(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
