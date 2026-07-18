import type { Profile } from "./types";

export const profile: Profile = {
  name: { en: "Mohammad El Prince" },
  handleName: "Mohammad El Prince",
  jobTitle: { en: "Software Development Engineer" },
  summary: {
    en: "Software engineer with a data background who builds and ships production systems on AWS. Designed and deployed 15+ serverless applications and a multi-region web platform serving operations teams at Amazon fulfillment centers. Strong in TypeScript, Python, and cloud infrastructure, with a bias for ownership and delivering end-to-end.",
  },
  location: { en: "Milton, ON" },
  social: {
    email: "mohammad-elprince@proton.me",
    github: "https://github.com/elprince-dev",
    githubUser: "elprince-dev",
    linkedin: "https://www.linkedin.com/in/elprince-dev/",
    twitter: "@elprince_dev",
    phone: "519-760-1559",
  },
  // Your résumé PDF lives in the original portfolio's /public. Drop a copy in
  // this project's /public (e.g. /Resume.pdf) and point here to enable the link.
  resumeUrl: undefined,
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elprince.dev"
).replace(/\/$/, "");

export default profile;
