/**
 * Moteur de détection de situation de détresse / crise
 * Identifie avec soin les situations nécessitant une intervention d'urgence :
 * - Pensées suicidaires ou automutilation
 * - Violences physiques, sexuelles ou coercition
 * - Urgences médicales aiguës (hémorragies, douleurs intolérables)
 */

export interface CrisisDetectionResult {
  isCrisis: boolean;
  category?: "SELF_HARM" | "VIOLENCE" | "MEDICAL_EMERGENCY";
  reassuranceMessage?: string;
  recommendedActions?: {
    label: string;
    action: string;
    phone?: string;
  }[];
}

const SELF_HARM_KEYWORDS = [
  "suicide",
  "suicider",
  "me tuer",
  "en finir",
  "envie de mourir",
  "plus envie de vivre",
  "automutilation",
  "me couper",
  "me faire du mal",
  "je veux disparaitre",
  "je ne veux plus exister",
];

const VIOLENCE_KEYWORDS = [
  "viol",
  "violee",
  "violée",
  "il m'a forcee",
  "il m'a forcée",
  "m'a agressée",
  "m'a agresse",
  "agression sexuelle",
  "abus sexuel",
  "il me bat",
  "il m'a frappee",
  "il m'a frappée",
  "attouchement",
  "menace de mort",
  "relation forcée",
  "rapport non consenti",
];

const MEDICAL_EMERGENCY_KEYWORDS = [
  "hemorragie",
  "hémorragie",
  "je saigne trop",
  "saignement abondant",
  "perte de connaissance",
  "evanouie",
  "évanouie",
  "douleur atroce",
  "douleur insupportable",
  "ventre tres dur",
];

export function detectCrisis(text: string): CrisisDetectionResult {
  if (!text || typeof text !== "string") {
    return { isCrisis: false };
  }

  // Normalize text: lowercase, remove accents
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Check self-harm
  for (const kw of SELF_HARM_KEYWORDS) {
    const kwNorm = kw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes(kwNorm)) {
      return {
        isCrisis: true,
        category: "SELF_HARM",
        reassuranceMessage:
          "🌸 Respire profondément. Ta vie a une valeur infinie et tu n'es pas seule face à cette douleur. Je suis une guide d'information et je tiens à ta sécurité. Des professionnelles bienveillantes sont à ton écoute dès maintenant.",
        recommendedActions: [
          {
            label: "Appeler la Ligne d'écoute (Gratuit)",
            action: "CALL",
            phone: "80 00 00 11",
          },
          {
            label: "Numéro d'urgence nationale 1011",
            action: "CALL",
            phone: "1011",
          },
          {
            label: "Rejoindre l'espace SOS Écoute",
            action: "NAVIGATE_SOS",
          },
        ],
      };
    }
  }

  // Check violence / abuse
  for (const kw of VIOLENCE_KEYWORDS) {
    const kwNorm = kw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes(kwNorm)) {
      return {
        isCrisis: true,
        category: "VIOLENCE",
        reassuranceMessage:
          "🧡 Ce que tu as vécu n'est absolument pas de ta faute. Tu as le droit d'être protégée, soignée et écoutée sans aucun jugement. Une sage-femme ou psychologue peut t'accompagner immédiatement dans la plus stricte discrétion.",
        recommendedActions: [
          {
            label: "Appeler le 1011 (Secours & Protection)",
            action: "CALL",
            phone: "1011",
          },
          {
            label: "Ligne Verte Écoute (80 00 00 11)",
            action: "CALL",
            phone: "80 00 00 11",
          },
          {
            label: "Voir le centre de santé partenaire le plus proche",
            action: "NAVIGATE_HEALTH_PASS",
          },
        ],
      };
    }
  }

  // Check acute medical emergency
  for (const kw of MEDICAL_EMERGENCY_KEYWORDS) {
    const kwNorm = kw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes(kwNorm)) {
      return {
        isCrisis: true,
        category: "MEDICAL_EMERGENCY",
        reassuranceMessage:
          "⚠️ Les symptômes que tu décris nécessitent un examen médical sans délai. Ne reste pas seule avec cette souffrance : rends-toi immédiatement aux urgences ou contacte un soignant.",
        recommendedActions: [
          {
            label: "CHU Sylvanus Olympio Lomé",
            action: "CALL",
            phone: "+228 22 21 25 01",
          },
          {
            label: "Secours d'urgence (1011)",
            action: "CALL",
            phone: "1011",
          },
        ],
      };
    }
  }

  return { isCrisis: false };
}

