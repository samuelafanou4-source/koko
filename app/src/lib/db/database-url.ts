/**
 * Connection URL preparation for Prisma on Supabase.
 *
 * Supabase's transaction pooler (Supavisor, port 6543) hands each query to
 * whichever server connection is free. Prisma's prepared statements then
 * collide with another client's ("42P05 prepared statement \"s0\" already
 * exists", or "26000 ... does not exist"): the query fails at random. Prisma
 * needs `pgbouncer=true` on such URLs to disable prepared statements.
 *
 * Pure module (no secrets logged), shared by both Prisma clients and the
 * health check.
 */

export const TRANSACTION_POOLER_PORT = "6543";

export function isTransactionPoolerUrl(url: URL): boolean {
  return url.port === TRANSACTION_POOLER_PORT;
}

/**
 * Returns the URL to give Prisma: unchanged, except that a transaction-pooler
 * URL always gets `pgbouncer=true`. Returns undefined when the input is empty
 * or not a valid URL (Prisma then reports the problem itself).
 */
export function prepareDatabaseUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  if (!/^postgres(ql)?:$/.test(url.protocol)) return raw;
  if (isTransactionPoolerUrl(url) && url.searchParams.get("pgbouncer") !== "true") {
    url.searchParams.set("pgbouncer", "true");
  }
  return url.toString();
}
