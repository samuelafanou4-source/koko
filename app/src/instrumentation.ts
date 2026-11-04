/**
 * Server start-up checks and safe error reporting.
 *
 * Logs never contain request bodies, cookies, tokens, IP addresses, health
 * data or secret values: only variable names, route templates, the Next.js
 * error digest and a short error code.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { checkEnv, formatEnvErrors } = await import("./lib/env");
    const checks = checkEnv();
    if (checks.some((check) => !check.ok)) {
      // Loud and explicit in the logs (Vercel > Logs); /api/health reports it too
      console.error(`❌ [Koko configuration] ${formatEnvErrors(checks)}`);
    }
  }
}

/** Safe code for an error: Prisma/Postgres code or error class, never the message. */
function safeErrorCode(error: unknown): string {
  if (error && typeof error === "object") {
    const candidate = error as { code?: unknown; name?: unknown; message?: unknown };
    if (typeof candidate.code === "string" && /^[A-Z0-9_]{2,12}$/i.test(candidate.code)) {
      return candidate.code;
    }
    // Postgres SQLSTATE embedded in Prisma connector errors, e.g. 42P05
    const sqlState = typeof candidate.message === "string" ? candidate.message.match(/code: "([0-9A-Z]{5})"/) : null;
    if (sqlState) return `PG_${sqlState[1]}`;
    if (typeof candidate.name === "string") return candidate.name.slice(0, 40);
  }
  return "UNKNOWN";
}

export async function onRequestError(
  error: unknown,
  request: { path: string; method: string },
  context: { routePath: string; routeType: string }
) {
  const digest =
    error && typeof error === "object" && "digest" in error ? String((error as { digest: unknown }).digest) : "none";
  // routePath is the route template ("/tableau-de-bord"), not the URL with its query
  console.error(
    `[koko] request-error route=${context.routePath} type=${context.routeType} method=${request.method} digest=${digest} code=${safeErrorCode(error)}`
  );
}
