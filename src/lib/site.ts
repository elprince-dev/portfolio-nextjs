/**
 * Centralized site metadata used by the layout (SEO/Open Graph), the structured
 * data, the sitemap, and robots (Req 13.4, 15.1–15.4).
 *
 * Canonical site URL resolution (first match wins):
 *  1. `NEXT_PUBLIC_SITE_URL` — explicit override.
 *  2. Vercel's build-time env vars — so preview deployments resolve Open
 *     Graph images, the sitemap, and robots against their own domain.
 *  3. The production domain, https://elprince.net.
 */

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "https://elprince.net")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Mohammad El Prince",
  title: "Mohammad El Prince — AI & Software Engineer",
  description:
    "AI Engineer and Software Engineer building production AI applications and scalable, type-safe systems on AWS. Retrieval-augmented and agentic systems, serverless platforms, and full-stack engineering.",
  url: siteUrl,
  /** Open Graph / Twitter Card preview image (Req 15.2) — 1200×630 crop of
   * the portfolio hero screenshot (public/projects/portfolio/1.png). Note:
   * running scripts/generate-og-image.mjs regenerates the branded card and
   * would overwrite this file. */
  previewImage: "/og-image.png",
  previewImageWidth: 1200,
  previewImageHeight: 630,
  jobTitle: "AI & Software Engineer",
  linkedinUrl: "https://www.linkedin.com/in/elprince-dev/",
  githubUrl: "https://github.com/elprince-dev",
  twitterHandle: "@elprince_dev",
} as const;
