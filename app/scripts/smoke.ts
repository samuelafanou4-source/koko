/**
 * Post-deploy check, read-only (creates no account, writes nothing):
 *
 *   npm run smoke -- https://koko-tg.vercel.app
 *
 * - public pages answer 200
 * - every private page (found automatically in src/app) redirects to /connexion
 * - every private API answers 401 without a session
 * - /api/health reports ok (databases, configuration, encryption)
 */
import { classifyRoute } from "../src/lib/routes";
import { listApiRoutes, listPageRoutes } from "../tests/support/route-inventory";

const base = (process.argv[2] ?? process.env.SMOKE_URL ?? "").replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Usage : npm run smoke -- https://koko-tg.vercel.app");
  process.exit(2);
}

let failures = 0;
function report(ok: boolean, label: string, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "✓" : "✖"} ${label}${detail ? `  (${detail})` : ""}`);
}

async function main() {
  console.log(`Vérification de ${base}\n`);

  for (const page of listPageRoutes()) {
    const kind = classifyRoute(page.url);
    if (page.url === "/offline") continue;
    const res = await fetch(base + page.url, { redirect: "manual" });
    if (kind === "public-page") {
      report(res.status === 200, `page publique ${page.url}`, `HTTP ${res.status}`);
    } else {
      const location = res.headers.get("location") ?? "";
      report(
        res.status >= 300 && res.status < 400 && location.includes("/connexion"),
        `page privée ${page.url} → /connexion`,
        `HTTP ${res.status}`
      );
    }
  }

  for (const api of listApiRoutes().filter((a) => classifyRoute(a.url) === "private-api")) {
    // GET when available: never sends a write, even unauthenticated
    const method = api.methods.includes("GET") ? "GET" : api.methods[0];
    const res = await fetch(base + api.url, {
      method,
      headers: method === "GET" ? {} : { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : "{}",
    });
    report(res.status === 401, `API privée ${method} ${api.url} → 401`, `HTTP ${res.status}`);
  }

  const health = await fetch(`${base}/api/health`);
  let body: { status?: string; checks?: Record<string, string>; invalidEnv?: string[] } = {};
  try {
    body = await health.json();
  } catch {
    // reported below
  }
  report(health.status === 200 && body.status === "ok", "/api/health", `HTTP ${health.status}`);
  for (const [name, status] of Object.entries(body.checks ?? {})) {
    report(status === "ok", `  santé : ${name}`, status);
  }
  if (body.invalidEnv?.length) console.log(`  Variables à corriger sur Vercel : ${body.invalidEnv.join(", ")}`);

  console.log(failures === 0 ? "\nTout est en ordre." : `\n${failures} vérification(s) en échec.`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(`✖ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
