import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { consume, getClientKey } from "@/lib/login-guard";

// 30 reports per 10 minutes per client: enough to see a bug, not to flood logs
const reportLimiter = new RateLimiterMemory({ keyPrefix: "client-errors", points: 30, duration: 600 });

const WHERE = /^[a-z][a-z0-9-]{0,40}$/;
const DIGEST = /^[A-Za-z0-9-]{0,40}$/;
const CODE = /^[A-Za-z]{1,40}$/;

/**
 * Receives safe client-side error reports (section id, digest, error class)
 * and writes one line to the server logs. Anything else is dropped.
 */
export async function POST(req: Request) {
  if (!(await consume(reportLimiter, await getClientKey()))) {
    return new NextResponse(null, { status: 204 });
  }
  let body: unknown = null;
  try {
    const text = await req.text();
    if (text.length <= 500) body = JSON.parse(text);
  } catch {
    body = null;
  }
  const { where, digest, code } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof where === "string" && WHERE.test(where) &&
    (digest === undefined || (typeof digest === "string" && DIGEST.test(digest))) &&
    typeof code === "string" && CODE.test(code)
  ) {
    console.error(`[koko] client-error where=${where} digest=${digest || "none"} code=${code}`);
  }
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
