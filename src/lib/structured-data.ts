/**
 * Person structured data describing Mohammad (Req 15.4).
 *
 * This lives in a non-route module so it can be imported by the App Router
 * layout (which only permits a fixed set of named exports) and injected as a
 * JSON-LD `<script>` tag, while remaining independently testable.
 */
import { siteConfig } from "@/lib/site";
import { contact } from "@/content/contact";
import { credibility } from "@/content/credibility";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.previewImage}`,
  email: `mailto:${contact.email}`,
  jobTitle: siteConfig.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: credibility.employer,
  },
  sameAs: [siteConfig.linkedinUrl, siteConfig.githubUrl],
  knowsAbout: [
    "AI Engineering",
    "Software Engineering",
    "Backend Engineering",
    "Cloud Architecture",
    "AWS",
    "TypeScript",
  ],
} as const;
