// High quality verified seed/fallback health centers in Togo (Lomé, Kara)
export interface HealthCenterData {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  priceInfo: string;
  isGirlFriendly: boolean;
  isPartner: boolean;
}

export const MOCK_HEALTH_CENTERS: HealthCenterData[] = [
  {
    id: "center-atbef-lome",
    name: "ATBEF Siège National (Association Togolaise pour le Bien-Être Familial)",
    description:
      "Centre de référence national pour la santé de reproduction, consultations gynécologiques et contraception sans tabou.",
    city: "Lomé",
    address: "Rue des Étoiles, Tokoin Solidarité",
    latitude: 6.1375,
    longitude: 1.2125,
    phone: "+228 22 21 44 26",
    priceInfo: "Consultation jeune : 1 500 FCFA (au lieu de 3 500 FCFA)",
    isGirlFriendly: true,
    isPartner: true,
  },
  {
    id: "center-cnou-lome",
    name: "Centre Médico-Social Universitaire (CNOU Université de Lomé)",
    description:
      "Accompagnement médical dédié aux étudiantes et étudiants. Soins d'urgence et écoute intime confidentielle.",
    city: "Lomé",
    address: "Campus Universitaire de Lomé, Boulevard Eyadéma",
    latitude: 6.1752,
    longitude: 1.2158,
    phone: "+228 22 25 99 96",
    priceInfo: "Gratuit ou tarif symbolique (500 FCFA) avec carte d'étudiante",
    isGirlFriendly: true,
    isPartner: true,
  },
  {
    id: "center-be-lome",
    name: "Cabinet Médical de Proximité Espoir & Sérénité",
    description:
      "Cabinet discret tenu par des sages-femmes conventionnées Koko. Accueil bienveillant garanti sans jugement moral.",
    city: "Lomé",
    address: "Quartier Bè-Kpota, face Pharmacie du Peuple",
    latitude: 6.142,
    longitude: 1.238,
    phone: "+228 90 12 34 56",
    priceInfo: "Consultation intime & frottis réduit : 2 000 FCFA",
    isGirlFriendly: true,
    isPartner: true,
  },
  {
    id: "center-atbef-kara",
    name: "Antenne Régionale ATBEF Kara",
    description:
      "Centre d'accueil et d'orientation pour les adolescentes et jeunes femmes du Nord Togo.",
    city: "Kara",
    address: "Quartier Chaminade, Kara",
    latitude: 9.5511,
    longitude: 1.1861,
    phone: "+228 26 60 03 14",
    priceInfo: "Consultation & écoute : 1 500 FCFA",
    isGirlFriendly: true,
    isPartner: true,
  },
  {
    id: "center-univ-kara",
    name: "Centre de Santé Université de Kara",
    description:
      "Structure médicale du campus de Kara. Planning familial et sensibilisation.",
    city: "Kara",
    address: "Campus Sud Université de Kara",
    latitude: 9.539,
    longitude: 1.194,
    phone: "+228 26 61 02 85",
    priceInfo: "Tarif étudiant conventionné : 500 FCFA",
    isGirlFriendly: true,
    isPartner: true,
  },
];

