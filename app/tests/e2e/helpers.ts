import { expect, type APIRequestContext, type BrowserContext, type Page } from "@playwright/test";
import crypto from "node:crypto";

export const ERROR_SCREEN = /Oups, cette page n'a pas pu s'afficher|This page couldn't load|Application error|Internal Server Error/;
export const SECTION_FALLBACK = /Cette partie n'a pas pu se charger/;

export function randomAccount() {
  // Letters only: Koko refuses pseudonyms holding 6+ digits (phone numbers)
  const suffix = Array.from(crypto.randomBytes(8), (byte) => String.fromCharCode(97 + (byte % 26))).join("");
  return { pseudonym: `TestFleur${suffix}`, password: `Test-${crypto.randomBytes(8).toString("hex")}` };
}

/** Creates a fresh account through the API; the session cookies land in the context. */
export async function signUpViaApi(request: APIRequestContext) {
  const account = randomAccount();
  const res = await request.post("/api/auth/register", { data: account });
  expect(res.status(), await res.text()).toBe(200);
  return account;
}

/** The page rendered without any error boundary or generic server error. */
export async function expectNoErrorScreen(page: Page) {
  await expect(page.locator("body")).not.toContainText(ERROR_SCREEN);
}

/**
 * Each test acts as a different visitor (own address for the rate limits),
 * as real users do in production. Sign-up is limited to 10 per hour per client:
 * without this, the test accounts would all share 127.0.0.1.
 */
export async function actAsDistinctClient(context: BrowserContext) {
  const ip = `10.${crypto.randomInt(256)}.${crypto.randomInt(256)}.${crypto.randomInt(1, 255)}`;
  await context.setExtraHTTPHeaders({ "x-forwarded-for": ip });
}
