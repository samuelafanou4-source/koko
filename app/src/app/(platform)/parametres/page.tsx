import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import ParametresClient from "./ParametresClient";

export const metadata: Metadata = { title: "Paramètres — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <ParametresClient />;
}
