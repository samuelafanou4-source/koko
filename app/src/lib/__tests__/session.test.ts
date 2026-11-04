import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { NextRequest } from "next/server";

// ---- Mocks: request cookies/headers, redirect(), both databases ----------

const cookieJar = new Map<string, string>();
const requestHeaders = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      cookieJar.has(name) ? { name, value: cookieJar.get(name)! } : undefined,
    set: (name: string, value: string) => {
      cookieJar.set(name, value);
    },
    delete: (name: string) => {
      cookieJar.delete(name);
    },
  }),
  headers: async () => ({
    get: (name: string) => requestHeaders.get(name.toLowerCase()) ?? null,
  }),
}));

class RedirectError extends Error {
  constructor(public url: string) {
    super(`REDIRECT ${url}`);
  }
}
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new RedirectError(url);
  },
}));

interface SessionRow {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
}
const sessions: SessionRow[] = [];
const account = {
  id: "user-1",
  anonId: "anon-1234567890abcdef",
  pseudonym: "FleurDeBaobab",
  role: "USER",
};

function matches(row: SessionRow, where: Record<string, unknown>): boolean {
  if (where.id !== undefined && row.id !== where.id) return false;
  if (where.userId !== undefined && row.userId !== where.userId) return false;
  if (where.refreshTokenHash !== undefined && row.refreshTokenHash !== where.refreshTokenHash) {
    return false;
  }
  const expires = where.expiresAt as { gt?: Date; lte?: Date } | undefined;
  if (expires?.gt && !(row.expiresAt > expires.gt)) return false;
  if (expires?.lte && !(row.expiresAt <= expires.lte)) return false;
  return true;
}

vi.mock("@/lib/db/identity", () => ({
  identityDb: {
    session: {
      create: async ({ data }: { data: Omit<SessionRow, "id"> }) => {
        const row = { id: `sid-${sessions.length + 1}`, ...data };
        sessions.push(row);
        return row;
      },
      findFirst: async ({ where }: { where: Record<string, unknown> }) =>
        sessions.find((row) => matches(row, where)) ?? null,
      findMany: async ({ where }: { where: Record<string, unknown> }) =>
        sessions.filter((row) => matches(row, where)).map(({ id, expiresAt }) => ({
          id,
          createdAt: new Date(),
          expiresAt,
        })),
      updateMany: async ({ where, data }: { where: Record<string, unknown>; data: Partial<SessionRow> }) => {
        const rows = sessions.filter((row) => matches(row, where));
        rows.forEach((row) => Object.assign(row, data));
        return { count: rows.length };
      },
      deleteMany: async ({ where }: { where: Record<string, unknown> }) => {
        let count = 0;
        for (let i = sessions.length - 1; i >= 0; i--) {
          if (matches(sessions[i], where)) {
            sessions.splice(i, 1);
            count++;
          }
        }
        return { count };
      },
    },
    userAccount: {
      findUnique: async ({ where }: { where: { id?: string } }) =>
        where.id === account.id ? account : null,
    },
  },
}));

vi.mock("@/lib/db/health", () => ({
  healthDb: {
    cycleEntry: { findMany: async () => [] },
    dailyLog: { findMany: async () => [] },
    healthCenter: { findMany: async () => [] },
  },
}));

// ---- Helpers --------------------------------------------------------------

beforeAll(() => {
  process.env.JWT_ACCESS_SECRET = "test-access-secret-".padEnd(64, "a");
  process.env.JWT_REFRESH_SECRET = "test-refresh-secret-".padEnd(64, "r");
});

beforeEach(() => {
  cookieJar.clear();
  requestHeaders.clear();
  sessions.length = 0;
});

async function login() {
  const auth = await import("../auth");
  await auth.startSession(account);
}

function request(path: string) {
  return new NextRequest(new URL(path, "http://localhost:3000"));
}

// ---- requireSession() -----------------------------------------------------

describe("requireSession()", () => {
  it("returns the session when the access cookie and the session row are valid", async () => {
    await login();
    const { requireSession } = await import("../session");
    const session = await requireSession();
    expect(session.pseudonym).toBe("FleurDeBaobab");
    expect(session.sid).toBe("sid-1");
  });

  it("redirects to /connexion with a safe next when there is no cookie", async () => {
    requestHeaders.set("x-koko-path", "/carnet-intime");
    const { requireSession } = await import("../session");
    await expect(requireSession()).rejects.toMatchObject({
      url: "/connexion?next=%2Fcarnet-intime",
    });
  });

  it("never puts an external next in the redirect", async () => {
    requestHeaders.set("x-koko-path", "//evil.com");
    const { requireSession } = await import("../session");
    await expect(requireSession()).rejects.toMatchObject({ url: "/connexion" });
  });

  it("rejects a forged access token", async () => {
    const { SignJWT } = await import("jose");
    cookieJar.set(
      "koko_access_session",
      await new SignJWT({ ...account, userId: account.id, sid: "sid-1" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(new TextEncoder().encode("not-the-real-secret".padEnd(64, "x")))
    );
    const { requireSession } = await import("../session");
    await expect(requireSession()).rejects.toBeInstanceOf(RedirectError);
  });

  it("rejects a valid token whose session was revoked (logout elsewhere)", async () => {
    await login();
    sessions.length = 0;
    cookieJar.delete("koko_refresh_session");
    const { requireSession } = await import("../session");
    await expect(requireSession()).rejects.toMatchObject({ url: "/connexion" });
  });

  it("goes through the refresh endpoint when only the refresh cookie is left", async () => {
    await login();
    cookieJar.delete("koko_access_session");
    requestHeaders.set("x-koko-path", "/le-cercle");
    const { requireSession } = await import("../session");
    await expect(requireSession()).rejects.toMatchObject({
      url: "/api/auth/refresh?next=%2Fle-cercle",
    });
  });

  it("enforces roles", async () => {
    await login();
    const { requireSession } = await import("../session");
    await expect(requireSession({ roles: ["MODERATOR", "ADMIN"] })).rejects.toMatchObject({
      url: "/tableau-de-bord",
    });
  });
});

// ---- Refresh rotation -----------------------------------------------------

describe("refresh-token rotation", () => {
  it("issues a new refresh token and keeps the old one only for a grace period", async () => {
    await login();
    const oldRefresh = cookieJar.get("koko_refresh_session")!;
    const auth = await import("../auth");

    const rotated = await auth.rotateRefreshSession(oldRefresh);
    expect(rotated?.sid).toBe("sid-2");
    expect(cookieJar.get("koko_refresh_session")).not.toBe(oldRefresh);

    const oldRow = sessions.find((row) => row.id === "sid-1")!;
    const graceMs = oldRow.expiresAt.getTime() - Date.now();
    expect(graceMs).toBeLessThanOrEqual(auth.REFRESH_GRACE_SECONDS * 1000);

    // After the grace period the old token is dead
    oldRow.expiresAt = new Date(Date.now() - 1000);
    expect(await auth.rotateRefreshSession(oldRefresh)).toBeNull();
  });
});

// ---- Private API route handlers ------------------------------------------

describe("private API route handlers", () => {
  it.each([
    ["cycle GET", () => import("@/app/api/cycle/route").then((m) => m.GET)],
    ["health-centers GET", () => import("@/app/api/health-centers/route").then((m) => m.GET)],
    ["sessions GET", () => import("@/app/api/auth/sessions/route").then((m) => m.GET)],
    ["circle posts GET", () => import("@/app/api/circle/posts/route").then((m) => m.GET)],
    ["moderation GET", () => import("@/app/api/circle/moderate/route").then((m) => m.GET)],
  ])("%s → 401 without a session cookie", async (_name, load) => {
    const handler = await load();
    const res = await handler(request("/api/x"), undefined as never);
    expect(res.status).toBe(401);
    expect(res.headers.get("Cache-Control")).toContain("no-store");
  });

  it.each([
    ["assistant POST", () => import("@/app/api/assistant/route").then((m) => m.POST)],
    ["cycle POST", () => import("@/app/api/cycle/route").then((m) => m.POST)],
    ["vouchers POST", () => import("@/app/api/vouchers/route").then((m) => m.POST)],
    ["delete-data DELETE", () => import("@/app/api/auth/delete-data/route").then((m) => m.DELETE)],
  ])("%s → 401 without a session cookie", async (_name, load) => {
    const handler = await load();
    const req = new NextRequest(new URL("/api/x", "http://localhost:3000"), {
      method: "POST",
      body: JSON.stringify({ message: "test" }),
    });
    const res = await handler(req, undefined as never);
    expect(res.status).toBe(401);
  });

  it("cycle GET → 401 with a garbage cookie", async () => {
    cookieJar.set("koko_access_session", "not-a-jwt");
    const { GET } = await import("@/app/api/cycle/route");
    const res = await GET(request("/api/cycle"), undefined as never);
    expect(res.status).toBe(401);
  });

  it("cycle GET → 200 with a valid session, with no-store", async () => {
    await login();
    const { GET } = await import("@/app/api/cycle/route");
    const res = await GET(request("/api/cycle"), undefined as never);
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("no-store");
    expect(res.headers.get("Vary")).toBe("Cookie");
    const body = await res.json();
    expect(body.authenticated).toBe(true);
  });

  it("sessions GET → 200 with a valid session", async () => {
    await login();
    const { GET } = await import("@/app/api/auth/sessions/route");
    const res = await GET(request("/api/auth/sessions"), undefined as never);
    expect(res.status).toBe(200);
  });

  it("cycle GET → 200 after an expired access token, by rotating the refresh token", async () => {
    await login();
    cookieJar.delete("koko_access_session");
    const { GET } = await import("@/app/api/cycle/route");
    const res = await GET(request("/api/cycle"), undefined as never);
    expect(res.status).toBe(200);
    expect(cookieJar.get("koko_access_session")).toBeTruthy();
  });

  it("moderation GET → 403 for a regular user", async () => {
    await login();
    const { GET } = await import("@/app/api/circle/moderate/route");
    const res = await GET(request("/api/circle/moderate"), undefined as never);
    expect(res.status).toBe(403);
  });

  it("logout revokes the server session: the old access token stops working", async () => {
    await login();
    const access = cookieJar.get("koko_access_session")!;
    const { POST } = await import("@/app/api/auth/logout/route");
    await POST();
    expect(sessions).toHaveLength(0);
    expect(cookieJar.has("koko_access_session")).toBe(false);

    // Replay of the stolen/old cookie
    cookieJar.set("koko_access_session", access);
    const { GET } = await import("@/app/api/cycle/route");
    const res = await GET(request("/api/cycle"), undefined as never);
    expect(res.status).toBe(401);
  });
});
