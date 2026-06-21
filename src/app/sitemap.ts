import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Generates `sitemap.xml` (Req 15.3). Lists the public routes: the home page
 * and the preserved blog list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
