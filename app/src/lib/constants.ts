/**
 * KOKO PLATFORM CONSTANTS
 *
 * Règle : aucune donnée inventée n'est affichée aux utilisatrices.
 * Tout chiffre, numéro ou partenaire ajouté ici doit être vérifié.
 */

export const PLATFORM_CONFIG = {
  name: "Koko",
  slogan: "Frappe à la porte de ton bien-être intime.",
  description:
    "Refuge confidentiel et bienveillant pour la santé intime des jeunes femmes et étudiantes au Togo.",
  safeExitUrl: "https://fr.wikipedia.org/wiki/M%C3%A9t%C3%A9orologie", // Safe escape redirect target
};

export const EMERGENCY_CONTACTS = {
  // Numéro confirmé par l'équipe Koko
  nationalEmergencyNumber: "1011",
  nationalEmergencyTitle: "Ligne d'assistance nationale (Secours & Urgence)",
  nationalEmergencyNote: "Numéro vert gratuit au Togo",

  // Numéro confirmé par l'équipe Koko
  ligneVerteEcoute: "80 00 00 11",
  ligneVerteTitle: "Ligne Verte Écoute & Orientation Santé Sexuelle",
  ligneVerteNote: "Appel confidentiel et gratuit (Togo)",

  // Service psychiatrique / urgence CHU Sylvanus Olympio Lomé
  chuLomeUrgence: "+228 22 21 25 01",
  chuLomeTitle: "CHU Sylvanus Olympio (Lomé)",
};

export const PRIVACY_DISCLOSURE = {
  encryptionModel:
    "Chiffrement AES-256-GCM au repos et HTTPS/TLS en transit. Séparation hermétique entre compte et données de santé.",
  ipLoggingPolicy: "Aucune adresse IP, aucun traqueur tiers, aucun cookie publicitaire.",
  legalCompliance:
    "Conformité avec les principes de la loi togolaise sur la protection des données à caractère personnel (IPDCP).",
};

