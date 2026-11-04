import type { Metadata } from "next";
import { requireSession } from "@/lib/session";
import AssistantClient from "./AssistantClient";

export const metadata: Metadata = { title: "Assistant — Koko" };

export default async function Page() {
  // Checked on every render: layouts are not re-run on client navigation
  await requireSession();
  return <AssistantClient />;
}
