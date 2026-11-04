import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Créer mon espace — Koko",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return <SignupForm />;
}
