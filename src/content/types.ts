/**
 * Shared content types for the portfolio redesign.
 *
 * These types describe the strongly-typed content layer consumed by the
 * presentation components and validated by the pure logic layer (`src/lib/*`).
 *
 * Note: The full content authoring (case-study data, etc.) is completed in a
 * later task. This module defines the structural shapes so the logic layer can
 * compile and be tested independently.
 */

// ---------------------------------------------------------------------------
// Case Study (shared by Projects and AI Engineering)
// ---------------------------------------------------------------------------

export interface TechStackItem {
  /** Label consistent with Skills terminology. */
  label: string;
  /** e.g. "react.svg" from /public. */
  iconAsset?: string;
}

export interface DiagramSpec {
  kind: "architecture" | "data-flow";
  /** Mermaid source or a structured node/edge description. */
  source: string;
  /** Descriptive alt text (Req 14.2). */
  alt: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  problem: string;
  solution: string;
  architectureOverview: string;
  /** Preserved from existing project content. */
  techStack: TechStackItem[];
  challenges: string[];
  results: string[];
  /** Present when an architecture/data flow is shown. */
  diagram?: DiagramSpec;
  /** Omitted when confidential. */
  repoUrl?: string;
  /** Omitted when confidential. */
  demoUrl?: string;
  /** true => omit links, show indicator. */
  confidential: boolean;
  /** Reused from /public. */
  imageAsset: string;
}

// ---------------------------------------------------------------------------
// AI Engineering Capability Area
// ---------------------------------------------------------------------------

export type AICapabilityKey =
  | "rag"
  | "llm-applications"
  | "agents"
  | "retrieval-embedding-pipelines"
  | "tool-calling"
  | "evaluation-pipelines";

export interface AICapabilityArea {
  key: AICapabilityKey;
  title: string;
  /** Always present (described competency). */
  competencyDescription: string;
  /** Present only when a user-supplied AI project exists. */
  project?: CaseStudy;
}

// ---------------------------------------------------------------------------
// Experience Stage
// ---------------------------------------------------------------------------

export interface ExperienceStage {
  /** Role/program/degree title. */
  title: string;
  /** Org or institution. */
  organization: string;
  /** Must match preserved resume content (Req 7.4). */
  timeReference: string;
  /** ISO date; used for chronological sort (Req 7.1). */
  startDate: string;
  description?: string;
  /** Short skill/tech tags shown under the description. */
  skills?: string[];
}

// ---------------------------------------------------------------------------
// Credibility / Trust Signals
// ---------------------------------------------------------------------------

export interface CredibilityMetric {
  /** Numeric value; must match the preserved resume content (Req 2.4). */
  value: string;
  /** Descriptive label. */
  label: string;
}

export interface CredibilityContent {
  /** Current employer (Req 2.1) — "Amazon". */
  employer: string;
  /** Current role focus (Req 2.1) — "Software Development". */
  roleFocus: string;
  /** Count of AWS certifications actually held (Req 2.2). */
  awsCertificationCount: number;
  /**
   * Named AWS certifications (Req 2.2). Length equals
   * `awsCertificationCount`; includes the Solutions Architect Associate and
   * Cloud Practitioner certifications.
   */
  awsCertifications: string[];
  /** At least three quantified metrics (Req 2.3). */
  metrics: CredibilityMetric[];
}

// ---------------------------------------------------------------------------
// Engineering Excellence
// ---------------------------------------------------------------------------

export interface EngineeringDepthArea {
  /** System Design, Scalability, Cloud Architecture, AWS Services, Backend. */
  title: string;
  description: string;
  /** Concrete evidence drawn from preserved content (Req 6.2). */
  evidence: string[];
  /** Labels consistent with Skills terminology (Req 6.3). */
  awsServices: string[];
}

// ---------------------------------------------------------------------------
// Skills as Expertise Domains
// ---------------------------------------------------------------------------

export type ExpertiseDomain =
  | "Backend"
  | "Frontend"
  | "Cloud"
  | "AI"
  | "Databases";

export interface SkillEntry {
  name: string;
  /** Each entry assigned to exactly one domain (Req 8.3). */
  domain: ExpertiseDomain;
}

export interface SkillsContent {
  /** Includes Backend, Frontend, Cloud, AI, Databases (Req 8.1). */
  domains: ExpertiseDomain[];
  entries: SkillEntry[];
}

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export interface Certification {
  /** e.g. "AWS Certified Solutions Architect – Associate". */
  name: string;
  /** Issuing organization — "Amazon Web Services". */
  issuer: string;
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export interface ContactContent {
  /** "mohammad-elprince@proton.me". */
  email: string;
  /** LinkedIn profile URL (elprince-dev). */
  linkedinUrl: string;
  /** GitHub profile URL (elprince-dev). */
  githubUrl: string;
  /** Label for the primary call-to-action (Req 10.2). */
  primaryCtaLabel: string;
}
