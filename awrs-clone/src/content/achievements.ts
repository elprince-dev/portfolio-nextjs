import type { Achievement } from "./types";

/** Certifications and key résumé highlights (English). */
export const achievements: Achievement[] = [
  {
    title: { en: "AWS Certified Solutions Architect – Associate" },
    description: {
      en: "Amazon Web Services associate-level certification for designing distributed systems on AWS.",
    },
    year: "2026",
    icon: "cloud",
  },
  {
    title: { en: "AWS Certified Cloud Practitioner" },
    description: {
      en: "Amazon Web Services foundational certification covering core AWS services, security, and architecture.",
    },
    year: "2025",
    icon: "cloud",
  },
  {
    title: { en: "15+ serverless tools in production" },
    description: {
      en: "Built and deployed 15+ serverless data-automation tools at Amazon delivering real-time operational alerts via Slack, SES, and SNS.",
    },
    year: "2025",
    icon: "rocket",
  },
  {
    title: { en: "100% test coverage across 6 packages" },
    description: {
      en: "Maintained full test coverage with automated CI/CD on a multi-package TypeScript monorepo using Vitest, ESLint, and snapshot testing.",
    },
    year: "2025",
    icon: "shield",
  },
];

export default achievements;
