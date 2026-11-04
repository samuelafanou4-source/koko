"use client";

import { useEffect } from "react";
import { logoutEverywhere, redirectToExpiredLogin } from "@/lib/client-session";
import { classifyRoute } from "@/lib/routes";

// Shared by every open tab: activity in one tab keeps the others alive.
// Holds a timestamp only, never health data.
const LAST_ACTIVITY_KEY = "koko_last_activity";
const ACTIVITY_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const CHECK_EVERY_MS = 15_000;

function readLastActivity(fallback: number): number {
  try {
    const value = Number(window.localStorage.getItem(LAST_ACTIVITY_KEY));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeLastActivity(now: number) {
  try {
    window.localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
  } catch {
    // Private browsing: the in-memory value below is enough for this tab
  }
}

/**
 * Platform-only guard:
 * - automatic logout after `timeoutMinutes` without activity;
 * - any 401 from a private API means the session is gone server-side:
 *   back to /connexion with "Ta session a expiré, reconnecte-toi".
 */
export function SessionGuard({ timeoutMinutes }: { timeoutMinutes: number }) {
  useEffect(() => {
    const timeoutMs = timeoutMinutes * 60_000;
    let lastActivity = Date.now();
    let loggingOut = false;
    let lastWrite = 0;
    writeLastActivity(lastActivity);

    const onActivity = () => {
      lastActivity = Date.now();
      // Throttled: one storage write every 5 s is plenty
      if (lastActivity - lastWrite > 5_000) {
        lastWrite = lastActivity;
        writeLastActivity(lastActivity);
      }
    };

    const check = () => {
      if (loggingOut) return;
      const latest = Math.max(lastActivity, readLastActivity(lastActivity));
      if (Date.now() - latest >= timeoutMs) {
        loggingOut = true;
        void logoutEverywhere("inactivite");
      }
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, onActivity, { passive: true })
    );
    // Phones suspend timers in the background: check again on return
    document.addEventListener("visibilitychange", check);
    const interval = window.setInterval(check, CHECK_EVERY_MS);

    return () => {
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, onActivity));
      document.removeEventListener("visibilitychange", check);
      window.clearInterval(interval);
    };
  }, [timeoutMinutes]);

  useEffect(() => {
    const originalFetch = window.fetch;
    let redirecting = false;

    window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);
      if (response.status === 401 && !redirecting) {
        const raw = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const url = new URL(raw, window.location.href);
        if (url.origin === window.location.origin && classifyRoute(url.pathname) === "private-api") {
          redirecting = true;
          redirectToExpiredLogin();
        }
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
