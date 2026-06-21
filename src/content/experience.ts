/**
 * Experience timeline content (Req 7.2–7.4).
 *
 * Includes the required career stages (Req 7.2): the Mechanical Engineering
 * education stage, the Flatiron School bootcamp stage, the Amazon operations
 * stage, the Amazon software-development stage, and the AI Engineering focus.
 *
 * Each stage carries a title, an associated organization or institution, and a
 * time reference (Req 7.3). Time references match the preserved resume content
 * (`/public/Resume - External.md`, Req 7.4). `startDate` (ISO) drives the
 * chronological ordering performed by `sortStagesChronologically`
 * (`src/lib/experience.ts`, Req 7.1) and is not displayed directly.
 */

import type { ExperienceStage } from "@/content/types";

export const experienceStages: ExperienceStage[] = [
  {
    title: "Master of Engineering — Mechanical Engineering",
    organization: "University of Guelph",
    timeReference: "01/2019 – 02/2021",
    startDate: "2019-01-01",
    description:
      "Course-based Master of Engineering in Mechanical Engineering in Guelph, ON.",
  },
  {
    title: "Full Stack Web Development",
    organization: "Flatiron School",
    timeReference: "02/2023 – 10/2023",
    startDate: "2023-02-01",
    description:
      "Full Stack Web Development online program in Python and JavaScript.",
  },
  {
    title: "Operations",
    organization: "Amazon",
    timeReference: "2021 – 2024",
    startDate: "2021-05-01",
    description:
      "Operations roles across multiple Ontario locations (Hamilton, St. Thomas, London, Mississauga) before transitioning to software development.",
  },
  {
    title: "Data Analyst — Software Development Focus",
    organization: "Amazon",
    timeReference: "02/2025 – Present",
    startDate: "2025-02-01",
    description:
      "Building serverless applications and a multi-region quality management platform (React 19, TypeScript, tRPC, AWS CDK) serving managers at North American fulfillment centers.",
  },
  {
    title: "AI Engineering Focus",
    organization: "Amazon",
    timeReference: "Present",
    startDate: "2025-06-01",
    description:
      "Extending serverless and backend expertise into AI engineering — RAG, LLM applications, agents, retrieval pipelines, tool calling, and evaluation.",
  },
];

export default experienceStages;
