import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import PassSanteClient from "./PassSanteClient";

export const metadata: Metadata = { title: "Pass Santé — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <PassSanteClient />;
}
