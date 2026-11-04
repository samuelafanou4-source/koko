"use client";

import { useAppStore } from "@/lib/store";
import { LOGIN_PATH } from "@/lib/routes";
import { sanitizeNextPath } from "@/lib/safe-next";

export type LogoutReason = "inactivite" | "expiree";

/**
 * Ends the session everywhere it lives on this device: server session and
 * cookies (POST /api/auth/logout), in-memory stores, session/local storage
 * and Cache Storage. Then leaves with a full navigation (replace, so the Back
 * button does not return to a private page).
 */
export async function logoutEverywhere(reason?: LogoutReason): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST", cache: "no-store" });
  } catch {
    // Offline: local traces are still cleared below
  }
  useAppStore.getState().clearLocalTraces();

  let target = "/";
  if (reason) {
    const params = new URLSearchParams({ raison: reason });
    const next = sanitizeNextPath(window.location.pathname);
    if (next) params.set("next", next);
    target = `${LOGIN_PATH}?${params.toString()}`;
  }
  window.location.replace(target);
}

/** Redirects to the login page after a 401 (session expired server-side). */
export function redirectToExpiredLogin(): void {
  useAppStore.getState().clearLocalTraces();
  const params = new URLSearchParams({ raison: "expiree" });
  const next = sanitizeNextPath(`${window.location.pathname}${window.location.search}`);
  if (next) params.set("next", next);
  window.location.replace(`${LOGIN_PATH}?${params.toString()}`);
}
