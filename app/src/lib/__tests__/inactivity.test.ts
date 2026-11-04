import { describe, it, expect } from "vitest";
import { DEFAULT_INACTIVITY_TIMEOUT_MINUTES, parseInactivityTimeout } from "../inactivity";

describe("INACTIVITY_TIMEOUT_MINUTES", () => {
  it("defaults to 15 minutes", () => {
    expect(DEFAULT_INACTIVITY_TIMEOUT_MINUTES).toBe(15);
    expect(parseInactivityTimeout(undefined)).toBe(15);
    expect(parseInactivityTimeout("")).toBe(15);
  });

  it("accepts a valid number of minutes", () => {
    expect(parseInactivityTimeout("5")).toBe(5);
    expect(parseInactivityTimeout("30")).toBe(30);
  });

  it("falls back to the default on invalid values", () => {
    expect(parseInactivityTimeout("abc")).toBe(15);
    expect(parseInactivityTimeout("0")).toBe(15);
    expect(parseInactivityTimeout("-3")).toBe(15);
    expect(parseInactivityTimeout("100000")).toBe(15);
  });
});
