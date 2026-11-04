// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { SectionBoundary } from "@/components/errors/SectionBoundary";
import DashboardClient from "@/app/(platform)/tableau-de-bord/DashboardClient";
import { parsePrediction } from "@/app/(platform)/tableau-de-bord/CycleSnippet";

// next/link needs the App Router at runtime: a plain anchor is enough here
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: Record<string, unknown>) => {
    delete rest.prefetch;
    return (
      <a href={String(href)} {...rest}>
        {children as React.ReactNode}
      </a>
    );
  },
}));

const user = { pseudonym: "FleurDeTest", role: "USER", anonIdHint: "anon-test" };
const FALLBACK = /Cette partie n'a pas pu se charger/;

beforeEach(() => {
  // Safe error reports go to /api/client-errors: swallow them in tests
  vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 204 })));
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function renderDashboard(loadCycle: () => Promise<never | null>) {
  return render(
    <SessionProvider user={user}>
      <DashboardClient loadCycle={loadCycle} />
    </SessionProvider>
  );
}

describe("dashboard resilience", () => {
  it("a failing cycle data source only replaces the cycle card", async () => {
    renderDashboard(() => Promise.reject(new Error("cycle-500")));

    expect(await screen.findByText(FALLBACK)).toBeTruthy();
    // The rest of the page is still there
    expect(screen.getByText(/Bonjour, FleurDeTest/)).toBeTruthy();
    expect(screen.getByText("Parler à Koko")).toBeTruthy();
    expect(screen.getByText(/Besoin d'aide maintenant/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Réessayer" })).toBeTruthy();
  });

  it("a brand-new account (no data at all) gets the empty state, not an error", async () => {
    renderDashboard(() => Promise.resolve(null));

    expect(await screen.findByText("Suivre mon cycle")).toBeTruthy();
    expect(screen.queryByText(FALLBACK)).toBeNull();
    expect(screen.getByText(/Bonjour, FleurDeTest/)).toBeTruthy();
  });

  it("retry reloads the failed section", async () => {
    let calls = 0;
    renderDashboard(() => (++calls === 1 ? Promise.reject(new Error("down")) : Promise.resolve(null)));

    (await screen.findByRole("button", { name: "Réessayer" })).click();
    await waitFor(() => expect(screen.getByText("Suivre mon cycle")).toBeTruthy());
    expect(calls).toBe(2);
  });
});

describe("SectionBoundary", () => {
  function Broken(): React.ReactNode {
    throw new Error("render crash with private text");
  }

  it("contains a render crash to its own section and reports it safely", () => {
    render(
      <div>
        <p>Section saine</p>
        <SectionBoundary name="test-section">
          <Broken />
        </SectionBoundary>
      </div>
    );

    expect(screen.getByText("Section saine")).toBeTruthy();
    expect(screen.getByText(FALLBACK)).toBeTruthy();
    // The report holds the section id and the error class, never the message
    const logged = vi.mocked(console.error).mock.calls.map((call) => call.join(" ")).join("\n");
    expect(logged).toContain("section-test-section");
    const reports = vi.mocked(fetch).mock.calls.map((call) => String(call[1]?.body ?? ""));
    expect(reports.join("")).not.toContain("private text");
  });
});

describe("parsePrediction (empty and malformed data never crash)", () => {
  it.each([null, undefined, {}, { currentDay: "3" }, { currentDay: Number.NaN }, "x", 42])(
    "%j → null",
    (value) => {
      expect(parsePrediction(value)).toBeNull();
    }
  );

  it("accepts a complete prediction", () => {
    expect(
      parsePrediction({
        currentDay: 3,
        totalCycleLength: 28,
        periodLength: 5,
        phaseLabel: "Règles",
        phaseSummary: "",
        daysUntilNextPeriod: 25,
      })
    ).not.toBeNull();
  });
});
