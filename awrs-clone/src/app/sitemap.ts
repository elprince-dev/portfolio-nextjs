import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/projects", "/blog", "/contact", "/wall"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
