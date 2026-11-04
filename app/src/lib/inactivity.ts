export const DEFAULT_INACTIVITY_TIMEOUT_MINUTES = 15;

/**
 * INACTIVITY_TIMEOUT_MINUTES: minutes without activity before the automatic
 * logout. Default 15; out-of-range or invalid values fall back to the default
 * (bounds: 1 minute to 24 hours).
 */
export function parseInactivityTimeout(value: string | undefined): number {
  if (value === undefined || value.trim() === "") return DEFAULT_INACTIVITY_TIMEOUT_MINUTES;
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 24 * 60) {
    return DEFAULT_INACTIVITY_TIMEOUT_MINUTES;
  }
  return minutes;
}
