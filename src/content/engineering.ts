/**
 * Engineering Excellence content (Req 6.1–6.3).
 *
 * The depth areas required by Requirement 6.1 are present: system design,
 * scalability, cloud architecture, AWS services, and backend engineering. Each
 * area references concrete evidence drawn from preserved content (Req 6.2),
 * including the multi-region serverless platform serving Amazon fulfillment
 * centers and the AWS services used.
 *
 * Every label in an area's `awsServices` exactly matches a Cloud-domain skill
 * label in `src/content/skills.ts`, keeping AWS terminology consistent with the
 * Skills section (Req 6.3).
 */

import type { EngineeringDepthArea } from "@/content/types";

export const engineeringDepthAreas: EngineeringDepthArea[] = [
  {
    title: "System Design",
    description:
      "Designing full-stack systems end to end — from edge authentication and type-safe APIs to data modeling and analytics — for the Quality Management Platform serving managers across North American fulfillment centers.",
    evidence: [
      "Designed a TypeScript monorepo (React 19, tRPC, AWS CDK) with a serverless API layer and CDN-based authentication.",
      "Implemented edge-level authentication, role-based access control, and real-time user monitoring.",
      "Built analytics dashboards with multi-location filtering and manager-level data aggregation.",
    ],
    awsServices: ["AWS Lambda", "CloudFront", "DynamoDB"],
  },
  {
    title: "Scalability",
    description:
      "Building event-driven, serverless workloads that scale to production traffic across multiple locations without managing servers.",
    evidence: [
      "Developed 15+ serverless data-automation tools processing operational data from S3 and internal APIs.",
      "Delivered real-time alerts via SES, SNS, and Slack to operations teams.",
      "Launched the platform MVP at a pilot location and expanded toward 8+ additional fulfillment centers.",
    ],
    awsServices: ["AWS Lambda", "EventBridge", "SES", "SNS", "S3"],
  },
  {
    title: "Cloud Architecture",
    description:
      "Architecting and deploying a multi-region web platform entirely as infrastructure-as-code, reproducible through AWS CDK with automated CI/CD.",
    evidence: [
      "Provisioned a multi-region footprint through AWS CDK infrastructure as code.",
      "Owned the full lifecycle from architecture design through CI/CD deployment and production monitoring.",
      "Configured CDN delivery, edge authentication, and observability for production workloads.",
    ],
    awsServices: ["CDK", "CloudFront", "CloudWatch", "Route 53", "WAF"],
  },
  {
    title: "AWS Services",
    description:
      "Hands-on depth across the AWS serverless and infrastructure stack used to run the platform and data-automation tools in production.",
    evidence: [
      "Compute and APIs on AWS Lambda with tRPC and DynamoDB persistence.",
      "Messaging and notifications through EventBridge, SES, and SNS.",
      "Edge delivery and security via CloudFront, WAF, and Route 53, with monitoring through CloudWatch and RUM.",
    ],
    awsServices: [
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "CloudFront",
      "EventBridge",
      "SES",
      "SNS",
      "CloudWatch",
      "RUM",
      "WAF",
      "Route 53",
    ],
  },
  {
    title: "Backend Engineering",
    description:
      "Writing type-safe, well-tested backend services in TypeScript and Python, owning the software lifecycle from requirements through production monitoring.",
    evidence: [
      "Built type-safe tRPC APIs backed by DynamoDB with role-based access control.",
      "Maintained 100% test coverage across 6 packages using Vitest, ESLint, and snapshot testing.",
      "Automated CI/CD pipelines for repeatable, infrastructure-as-code deployments.",
    ],
    awsServices: ["AWS Lambda", "DynamoDB"],
  },
];

export default engineeringDepthAreas;
