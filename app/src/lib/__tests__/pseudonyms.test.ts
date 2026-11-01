import { describe, it, expect } from "vitest";
import {
  generateSuggestedPseudonym,
  generateSuggestions,
  isValidPseudonym,
} from "../pseudonyms";

describe("Pseudonym Logic", () => {
  it("generates poetic botanical pseudonyms", () => {
    const pseudo = generateSuggestedPseudonym();
    expect(pseudo).toBeTypeOf("string");
    expect(pseudo.length).toBeGreaterThan(5);
  });

  it("generates a list of distinct suggestions", () => {
    const suggestions = generateSuggestions(4);
    expect(suggestions.length).toBe(4);
    const unique = new Set(suggestions);
    expect(unique.size).toBe(4);
  });

  it("validates safe pseudonyms successfully", () => {
    expect(isValidPseudonym("FleurDeBaobab").valid).toBe(true);
    expect(isValidPseudonym("DouceurDeMenthe").valid).toBe(true);
    expect(isValidPseudonym("Amina_Lome").valid).toBe(true);
  });

  it("rejects pseudonyms that compromise user privacy or security", () => {
    // Too short
    expect(isValidPseudonym("ab").valid).toBe(false);

    // Contains email format
    expect(isValidPseudonym("fatou@gmail.com").valid).toBe(false);

    // Contains phone numbers
    expect(isValidPseudonym("Amina90123456").valid).toBe(false);
  });
});

