import type { Metadata } from "next";
import { ErrorScreen } from "@/components/errors/ErrorScreen";

export const metadata: Metadata = {
  title: "Page introuvable — Koko",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center">
      <ErrorScreen
        title="Cette page n'existe pas"
        message="Le lien est peut-être incomplet, ou la page a changé d'adresse. Tu peux revenir à l'accueil en toute sécurité."
      />
    </main>
  );
}
