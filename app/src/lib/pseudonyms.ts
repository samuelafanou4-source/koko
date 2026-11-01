/**
 * Générateur et validateur de pseudonymes poétiques et botaniques
 * pour garantir un anonymat total et chaleureux sans utiliser de nom réel.
 */

const BOTANICAL_PREFIXES = [
  "Fleur",
  "Feuille",
  "Brin",
  "Graine",
  "Petale",
  "Racine",
  "Ecorce",
  "Bourgeon",
  "Rosier",
  "Soleil",
  "Ombre",
  "Douceur",
  "Source",
  "Rosee",
  "Palme",
];

const BOTANICAL_SUFFIXES = [
  "DeBaobab",
  "DeKarite",
  "DeHibiscus",
  "DeManguier",
  "DeNenuphar",
  "DeSauge",
  "DeMenthe",
  "DeLilas",
  "DeLavande",
  "DePalmier",
  "DAlbizie",
  "DePapaye",
  "DeJasmin",
  "DeLotus",
  "DOranger",
  "DeFlamboyant",
  "DeBambou",
  "DeMimosa",
];

export function generateSuggestedPseudonym(): string {
  const prefix =
    BOTANICAL_PREFIXES[Math.floor(Math.random() * BOTANICAL_PREFIXES.length)];
  const suffix =
    BOTANICAL_SUFFIXES[Math.floor(Math.random() * BOTANICAL_SUFFIXES.length)];
  return `${prefix}${suffix}`;
}

export function generateSuggestions(count = 4): string[] {
  const set = new Set<string>();
  while (set.size < count) {
    set.add(generateSuggestedPseudonym());
  }
  return Array.from(set);
}

export function isValidPseudonym(pseudo: string): {
  valid: boolean;
  message?: string;
} {
  const trimmed = pseudo.trim();
  if (trimmed.length < 3) {
    return {
      valid: false,
      message: "Le pseudonyme doit comporter au moins 3 caractères.",
    };
  }
  if (trimmed.length > 30) {
    return {
      valid: false,
      message: "Le pseudonyme ne peut dépasser 30 caractères.",
    };
  }
  // No emails or phone numbers allowed in pseudonyms to protect anonymity
  if (trimmed.includes("@") || trimmed.includes(".")) {
    return {
      valid: false,
      message:
        "Pour ta protection, n'inclus aucune adresse email ni nom de famille.",
    };
  }
  if (/\d{6,}/.test(trimmed)) {
    return {
      valid: false,
      message:
        "Pour ta protection, n'inclus aucun numéro de téléphone dans ton pseudonyme.",
    };
  }
  return { valid: true };
}

