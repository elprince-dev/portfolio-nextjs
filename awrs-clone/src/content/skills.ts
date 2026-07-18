import type { SkillsContent } from "./types";

/** Technical skills, grouped exactly as on the résumé. */
export const skills: SkillsContent = {
  domains: ["Languages", "Frameworks", "Cloud & Infrastructure", "Tools"],
  entries: [
    // Languages
    { name: "TypeScript", domain: "Languages" },
    { name: "Python", domain: "Languages" },
    { name: "JavaScript", domain: "Languages" },
    { name: "HTML/CSS", domain: "Languages" },
    { name: "SQL", domain: "Languages" },

    // Frameworks
    { name: "React 19", domain: "Frameworks" },
    { name: "tRPC", domain: "Frameworks" },
    { name: "Node.js", domain: "Frameworks" },
    { name: "Vitest", domain: "Frameworks" },

    // Cloud & Infrastructure
    { name: "AWS Lambda", domain: "Cloud & Infrastructure" },
    { name: "AWS CDK", domain: "Cloud & Infrastructure" },
    { name: "DynamoDB", domain: "Cloud & Infrastructure" },
    { name: "S3", domain: "Cloud & Infrastructure" },
    { name: "CloudFront", domain: "Cloud & Infrastructure" },
    { name: "EventBridge", domain: "Cloud & Infrastructure" },
    { name: "SES", domain: "Cloud & Infrastructure" },
    { name: "SNS", domain: "Cloud & Infrastructure" },
    { name: "CloudWatch", domain: "Cloud & Infrastructure" },
    { name: "RUM", domain: "Cloud & Infrastructure" },
    { name: "WAF", domain: "Cloud & Infrastructure" },
    { name: "Route 53", domain: "Cloud & Infrastructure" },
    { name: "Infrastructure as Code", domain: "Cloud & Infrastructure" },

    // Tools
    { name: "Git", domain: "Tools" },
    { name: "Nx", domain: "Tools" },
    { name: "Vite", domain: "Tools" },
    { name: "ESLint", domain: "Tools" },
    { name: "Prettier", domain: "Tools" },
  ],
};

export default skills;
