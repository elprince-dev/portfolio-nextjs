import type { ExperienceStage } from "./types";

/** Career timeline, ported from the résumé (English). */
export const experienceStages: ExperienceStage[] = [
  {
    title: { en: "Data Analyst — Software Development Focus" },
    organization: "Amazon",
    timeReference: { en: "02/2025 – Present" },
    startDate: "2025-02-01",
    description: {
      en: "Multiple Locations (Hamilton, St. Thomas, London, Mississauga, ON). Owning software end-to-end well beyond the data analyst role.",
    },
    bullets: {
      en: [
        "Designed and built a full-stack quality management web application (React 19, TypeScript, tRPC, AWS CDK) with serverless APIs, DynamoDB, and role-based access control, serving managers at NA fulfillment centers.",
        "Developed 15+ serverless data automation tools (Python, AWS Lambda, CDK, EventBridge) processing operational data from S3 and internal APIs, delivering real-time alerts via Slack, email (SES), and SNS — covering inventory accuracy, equipment monitoring, ticket tracking, and workforce analytics.",
        "Owned the full software lifecycle for each tool: requirements, architecture, infrastructure-as-code deployment (AWS CDK), CI/CD configuration, and production monitoring.",
        "Conducted architecture reviews and design discussions with analyst teammates on serverless patterns and AWS CDK best practices.",
      ],
    },
  },
  {
    title: { en: "Operations" },
    organization: "Amazon",
    timeReference: { en: "05/2021 – 2024" },
    startDate: "2021-05-01",
    description: {
      en: "Operations roles across multiple Ontario locations before transitioning to software development in 2025.",
    },
  },
  {
    title: { en: "Full Stack Web Development" },
    organization: "Flatiron School",
    timeReference: { en: "02/2023 – 10/2023" },
    startDate: "2023-02-01",
    description: {
      en: "Full Stack Web Development online program in Python and JavaScript.",
    },
  },
  {
    title: { en: "Master of Engineering — Mechanical Engineering" },
    organization: "University of Guelph",
    timeReference: { en: "01/2019 – 02/2021" },
    startDate: "2019-01-01",
    description: {
      en: "Course-based Master of Engineering in Mechanical Engineering, Guelph, ON.",
    },
  },
];

/** Most-recent-first, for top-down timeline rendering. */
export function sortStagesChronologically(
  stages: ExperienceStage[]
): ExperienceStage[] {
  return [...stages].sort(
    (a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

export default experienceStages;
