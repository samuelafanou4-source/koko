"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    // Dev chunk names are not hashed, a worker would serve stale CSS/JS
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline registration is optional.
    });
  }, []);
  return null;
}
