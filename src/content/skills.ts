/**
 * Skills content grouped as expertise domains (Req 8.1–8.3).
 *
 * The five required domains are present (Req 8.1): Backend, Frontend, Cloud, AI,
 * and Databases. Skill entries are preserved from the existing `AboutSection`
 * content and the resume (`/public/Resume - External.md`) — Languages,
 * Frameworks, Cloud & Infrastructure, and Tools — re-grouped into expertise
 * domains. Each entry is assigned to exactly one domain (Req 8.3), so grouping
 * the entries by domain forms a partition over the full entry set.
 *
 * The Cloud-domain AWS service labels here are the single source of truth for
 * AWS terminology; the Engineering Excellence content references these exact
 * labels so AWS naming stays consistent across sections (Req 6.3).
 *
 * The AI-domain entries mirror the AI Engineering capability areas, reflecting
 * the described competencies presented in that section.
 */

import type { SkillsContent } from "@/content/types";

export const skills: SkillsContent = {
  domains: ["Backend", "Frontend", "Cloud", "AI", "Databases"],
  entries: [
    // Backend
    { name: "TypeScript", domain: "Backend" },
    { name: "Python", domain: "Backend" },
    { name: "Node.js", domain: "Backend" },
    { name: "tRPC", domain: "Backend" },
    { name: "Vitest", domain: "Backend" },
    { name: "Git", domain: "Backend" },
    { name: "Nx", domain: "Backend" },
    { name: "ESLint", domain: "Backend" },
    { name: "Prettier", domain: "Backend" },

    // Frontend
    { name: "React 19", domain: "Frontend" },
    { name: "JavaScript", domain: "Frontend" },
    { name: "HTML/CSS", domain: "Frontend" },
    { name: "Vite", domain: "Frontend" },

    // Cloud (AWS service labels — source of truth for Req 6.3)
    { name: "AWS Lambda", domain: "Cloud" },
    { name: "CDK", domain: "Cloud" },
    { name: "S3", domain: "Cloud" },
    { name: "CloudFront", domain: "Cloud" },
    { name: "EventBridge", domain: "Cloud" },
    { name: "SES", domain: "Cloud" },
    { name: "SNS", domain: "Cloud" },
    { name: "CloudWatch", domain: "Cloud" },
    { name: "RUM", domain: "Cloud" },
    { name: "WAF", domain: "Cloud" },
    { name: "Route 53", domain: "Cloud" },
    { name: "Infrastructure as Code", domain: "Cloud" },

    // AI (described competency areas)
    { name: "Retrieval-Augmented Generation", domain: "AI" },
    { name: "LLM Applications", domain: "AI" },
    { name: "Agents", domain: "AI" },
    { name: "Retrieval & Embedding Pipelines", domain: "AI" },
    { name: "Tool Calling", domain: "AI" },
    { name: "Evaluation Pipelines", domain: "AI" },

    // Databases
    { name: "DynamoDB", domain: "Databases" },
    { name: "SQL", domain: "Databases" },
  ],
};

export default skills;
