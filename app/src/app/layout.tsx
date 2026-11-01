import type { Metadata, Viewport } from "next";
import { Quicksand, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koko — Espace bien-être intime & confidentiel",
  description:
    "Sanctuaire d'écoute active, de suivi de cycle et d'orientation médicale pour les jeunes femmes et étudiantes au Togo. 100% anonyme, gratuit et bienveillant.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcf9f4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${quicksand.variable} ${plusJakartaSans.variable}`}
    >
      <body className="bg-surface text-on-surface antialiased min-h-screen flex flex-col font-body">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
