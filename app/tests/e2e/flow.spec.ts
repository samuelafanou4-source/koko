/**
 * Full journey on the production build, through the real UI (360 px):
 * sign up → dashboard → every private page → logout → login → delete data.
 */
import { expect, test } from "@playwright/test";
import { actAsDistinctClient, expectNoErrorScreen, randomAccount, SECTION_FALLBACK } from "./helpers";

test.beforeEach(async ({ context }) => {
  await actAsDistinctClient(context);
});

const PRIVATE_PAGES = ["/assistant-koko", "/carnet-intime", "/le-cercle", "/pass-sante", "/parametres", "/tableau-de-bord"];

test("sign up, browse, log out, log in, delete my data", async ({ page }) => {
  const { pseudonym, password } = randomAccount();

  // Sign up from the landing page
  await page.goto("/");
  await page.getByRole("link", { name: "Créer mon espace" }).first().click();
  await expect(page).toHaveURL(/\/onboarding$/);
  await page.getByLabel("Ton pseudo").fill(pseudonym);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Créer mon espace" }).click();

  // Logged in automatically, greeted by her pseudonym
  await expect(page).toHaveURL(/\/tableau-de-bord$/);
  await expect(page.getByRole("heading", { name: new RegExp(`Bonjour, ${pseudonym}`) })).toBeVisible();
  await expect(page.getByText("Suivre mon cycle")).toBeVisible();
  await expectNoErrorScreen(page);

  // Every private page renders
  for (const url of PRIVATE_PAGES) {
    const response = await page.goto(url);
    expect(response?.status(), url).toBe(200);
    await page.waitForLoadState("networkidle");
    await expectNoErrorScreen(page);
    await expect(page.locator("body"), url).not.toContainText(SECTION_FALLBACK);
    // Nothing wider than the 360 px screen (long pseudonyms included)
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, `${url} déborde horizontalement`).toBeLessThanOrEqual(360);
  }

  // Log out from the account menu
  await page.getByRole("button", { name: /Mon compte/ }).click();
  await page.getByRole("menuitem", { name: "Se déconnecter" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/tableau-de-bord");
  await expect(page).toHaveURL(/\/connexion\?next=%2Ftableau-de-bord/);

  // Wrong password: generic message
  await page.getByLabel("Ton pseudo").fill(pseudonym);
  await page.locator("#password").fill("pas-le-bon");
  await page.getByRole("button", { name: "Me connecter" }).click();
  await expect(page.getByText("Pseudo ou mot de passe incorrect.")).toBeVisible();

  // Log back in: back to the page she asked for
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Me connecter" }).click();
  await expect(page).toHaveURL(/\/tableau-de-bord$/);
  await expect(page.getByRole("heading", { name: new RegExp(`Bonjour, ${pseudonym}`) })).toBeVisible();

  // Delete all her data
  await page.goto("/parametres");
  // Sections above load their data after the first paint and move the button
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Supprimer toutes mes données" }).click();
  await page.getByRole("button", { name: "Oui, supprimer tout maintenant" }).click();
  await expect(page.getByText(/définitivement\s+supprimées/)).toBeVisible();
  await expect(page).toHaveURL(/\/$/, { timeout: 10_000 });

  // The account no longer exists
  await page.goto("/connexion");
  await page.getByLabel("Ton pseudo").fill(pseudonym);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Me connecter" }).click();
  await expect(page.getByText("Pseudo ou mot de passe incorrect.")).toBeVisible();
});

test("the SOS page stays reachable without an account", async ({ page }) => {
  const response = await page.goto("/sos-ecoute");
  expect(response?.status()).toBe(200);
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
});

test("an unknown page shows the calm 404, with the SOS link", async ({ page }) => {
  await page.goto("/connexion");
  // Unknown pages are private by default: logged out they go to /connexion,
  // so check the 404 page for a logged-in user
  const { pseudonym, password } = randomAccount();
  const res = await page.request.post("/api/auth/register", { data: { pseudonym, password } });
  expect(res.ok()).toBe(true);
  const notFound = await page.goto("/cette-page-n-existe-pas");
  expect(notFound?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Cette page n'existe pas" })).toBeVisible();
  await expect(page.getByRole("link", { name: /SOS/ })).toBeVisible();
});
