import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = { title: "Mon espace — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <DashboardClient />;
}
