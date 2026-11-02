/**
 * KOKO PLATFORM CONSTANTS & METRICS
 *
 * NOTE CONCERNANT LES DONNÉES DU PROTOTYPE :
 * Conformément aux directives de transparence et d'honnêteté, les chiffres
 * ci-dessous proviennent de maquettes UI de démonstration et sont annotés
 * avec un marqueur TODO pour permettre leur remplacement par des données réelles
 * vérifiées avant le déploiement public.
 */

export const PLATFORM_CONFIG = {
  name: "Koko",
  slogan: "Frappe à la porte de ton bien-être intime.",
  description:
    "Refuge confidentiel et bienveillant pour la santé intime des jeunes femmes et étudiantes au Togo.",
  safeExitUrl: "https://fr.wikipedia.org/wiki/M%C3%A9t%C3%A9orologie", // Safe escape redirect target
};

export const MOCK_STATISTICS = {
  // TODO: Remplacer par le nombre réel de questions traitées après le lancement
  questionsAnsweredCount: "14 200+",
  questionsAnsweredLabel: "Questions posées sans tabou (donnée prototype)",

  // TODO: Remplacer par le nombre réel de structures et pharmacies partenaires conventionnées
  partnerClinicsCount: "42",
  partnerClinicsLabel: "Centres de santé & partenaires labellisés (donnée prototype)",

  // Donnée technique réelle : suppression complète des données en 1 clic
  dataEraseGuaranteed: "100%",
  dataEraseLabel: "Données effaçables en 1 clic à tout moment",
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

