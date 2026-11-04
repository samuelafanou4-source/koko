import type { MetadataRoute } from "next";

const SITE_URL = process.env.APP_URL || "https://koko-tg.vercel.app";

/** Indexable public pages only. Private pages, login and sign-up are never listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/charte`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
