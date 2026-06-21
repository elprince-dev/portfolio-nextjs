import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Generates `robots.txt` (Req 15.3). Allows all crawlers and points to the
 * sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
