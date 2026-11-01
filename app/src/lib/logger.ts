/**
 * Server logger that never prints request bodies, IPs, or health content.
 */
export function logServerError(context: string): void {
  if (process.env.NODE_ENV === "development") {
    console.error(`[koko] ${context}`);
  }
}
