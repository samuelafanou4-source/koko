"use client";

/**
 * Safe client-side error reporting. Sends only: where it happened (a fixed
 * identifier), the Next.js digest and the error class. Never the message,
 * the stack, the URL query, form contents or any health data.
 */
export function safeErrorName(error: unknown): string {
  if (error instanceof Error && /^[A-Za-z]{1,40}$/.test(error.name)) return error.name;
  return "Error";
}

export function reportClientError(where: string, error: unknown): void {
  const digest =
    error && typeof error === "object" && "digest" in error
      ? String((error as { digest?: unknown }).digest ?? "")
      : "";
  const payload = { where, digest, code: safeErrorName(error) };
  // Browser console: the same three safe fields only
  console.error(`[koko] ${where} digest=${digest || "none"} code=${payload.code}`);
  try {
    const body = JSON.stringify(payload);
    if (!navigator.sendBeacon?.("/api/client-errors", new Blob([body], { type: "application/json" }))) {
      void fetch("/api/client-errors", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  } catch {
    // Reporting must never break the page
  }
}
