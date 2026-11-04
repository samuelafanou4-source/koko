import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Me connecter — Koko",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return <LoginForm />;
}
