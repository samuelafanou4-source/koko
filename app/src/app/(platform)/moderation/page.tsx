import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import ModerationClient from "./ModerationClient";

export const metadata: Metadata = { title: "Modération — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession({ roles: ["MODERATOR", "ADMIN"] });
  return <ModerationClient />;
}
