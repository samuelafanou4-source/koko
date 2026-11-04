"use client";

import { sanitizeNextPath } from "@/lib/safe-next";
import { hasPendingTopic } from "@/lib/topics";
import { DASHBOARD_PATH } from "@/lib/routes";

/**
 * Where to go after login or sign-up: the validated "next" page she asked
 * for, else the assistant if she picked a topic on the landing page,
 * else her dashboard.
 */
export function postAuthTarget(search: string): string {
  const next = sanitizeNextPath(new URLSearchParams(search).get("next"));
  if (next) return next;
  if (hasPendingTopic()) return "/assistant-koko";
  return DASHBOARD_PATH;
}
