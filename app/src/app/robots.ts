import type { MetadataRoute } from "next";

const SITE_URL = process.env.APP_URL || "https://koko-tg.vercel.app";

/** Only the public presentation pages may be crawled. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/$", "/charte", "/sos-ecoute"],
      disallow: [
        "/api/",
        "/connexion",
        "/onboarding",
        "/offline",
        "/tableau-de-bord",
        "/assistant-koko",
        "/carnet-intime",
        "/le-cercle",
        "/pass-sante",
        "/parametres",
        "/moderation",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
