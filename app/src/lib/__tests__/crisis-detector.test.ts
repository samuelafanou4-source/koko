import { describe, it, expect } from "vitest";
import { detectCrisis } from "../crisis-detector";

describe("Crisis Detection Engine", () => {
  it("detects self-harm expressions and returns caring message + emergency lines", () => {
    const inputs = [
      "Je n'en peux plus, j'ai envie de me tuer",
      "Je pense au suicide tous les soirs",
      "J'ai envie de mourir",
    ];

    for (const input of inputs) {
      const res = detectCrisis(input);
      expect(res.isCrisis).toBe(true);
      expect(res.category).toBe("SELF_HARM");
      expect(res.reassuranceMessage).toContain("Respire profondément");
      expect(res.recommendedActions).toBeDefined();
      expect(res.recommendedActions?.some((a) => a.phone === "1014")).toBe(true);
    }
  });

  it("detects sexual violence or non-consensual acts", () => {
    const inputs = [
      "J'ai été victime d'un viol hier soir",
      "Il m'a forcée à avoir un rapport sans mon accord",
      "Mon partenaire m'a agressée",
    ];

    for (const input of inputs) {
      const res = detectCrisis(input);
      expect(res.isCrisis).toBe(true);
      expect(res.category).toBe("VIOLENCE");
      expect(res.reassuranceMessage).toContain("pas de ta faute");
    }
  });

  it("detects acute medical emergencies such as severe bleeding", () => {
    const res = detectCrisis("J'ai une hémorragie sévère et je me sens très faible");
    expect(res.isCrisis).toBe(true);
    expect(res.category).toBe("MEDICAL_EMERGENCY");
    expect(res.reassuranceMessage).toContain("examen médical sans délai");
  });

  it("returns isCrisis: false for normal health and cycle questions", () => {
    const normalQueries = [
      "Est-ce que je peux tomber enceinte si le préservatif a craqué ?",
      "J'ai des crampes douces le deuxième jour de mes règles",
      "Quelle est la différence entre pertes blanches et mycose ?",
      "Je stresse pour mes examens de fin d'année",
    ];

    for (const q of normalQueries) {
      const res = detectCrisis(q);
      expect(res.isCrisis).toBe(false);
    }
  });
});

