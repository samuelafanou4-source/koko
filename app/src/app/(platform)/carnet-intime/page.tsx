import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import CarnetClient from "./CarnetClient";

export const metadata: Metadata = { title: "Carnet intime — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <CarnetClient />;
}
