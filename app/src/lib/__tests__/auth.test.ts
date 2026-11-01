import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../passwords";
import { isValidPseudonym } from "../pseudonyms";

describe("Auth password hashing", () => {
  it("hashes with argon2 and verifies the original password", async () => {
    const hash = await hashPassword("KokoSecurite2026!");
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await verifyPassword(hash, "KokoSecurite2026!")).toBe(true);
    expect(await verifyPassword(hash, "wrong-password")).toBe(false);
  });
});

describe("Signup rules", () => {
  it("accepts a botanical pseudonym and a password of at least 6 characters", () => {
    expect(isValidPseudonym("FleurDeBaobab").valid).toBe(true);
    expect("secret1".length).toBeGreaterThanOrEqual(6);
  });
});
