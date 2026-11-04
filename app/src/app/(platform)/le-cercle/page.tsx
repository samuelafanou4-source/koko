import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import CercleClient from "./CercleClient";

export const metadata: Metadata = { title: "Le Cercle — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <CercleClient />;
}
