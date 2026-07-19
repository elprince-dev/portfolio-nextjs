import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/content/projects";
import { locales } from "@/lib/i18n";

/**
 * Generates `sitemap.xml` (Req 15.3). Lists the public routes — the home
 * page, the contact page, and the project detail pages — for every locale
 * (/en, /ar).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${locale}/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);
}
