import type { Locale } from "@/i18n/config";

/**
 * A value available in (at least) English. Arabic is optional so the codebase
 * can be re-internationalized later, but the site currently renders English.
 */
export type Localized<T = string> = { en: T; ar?: T };

/** Resolve a localized value, falling back to English. */
export function tl<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  githubUser: string;
  twitter?: string;
  phone?: string;
}

export interface Profile {
  name: Localized;
  handleName: string;
  jobTitle: Localized;
  /** Short professional summary (résumé headline). */
  summary: Localized;
  location: Localized;
  social: SocialLinks;
  resumeUrl?: string;
}

export interface ExperienceStage {
  title: Localized;
  organization: string;
  timeReference: Localized;
  startDate: string;
  description: Localized;
  /** Optional detail bullets (e.g. résumé accomplishments). */
  bullets?: Localized<string[]>;
}

export type SkillDomain =
  | "Languages"
  | "Frameworks"
  | "Cloud & Infrastructure"
  | "Tools";

export interface SkillEntry {
  name: string;
  domain: SkillDomain;
}

export interface SkillsContent {
  domains: SkillDomain[];
  entries: SkillEntry[];
}

export interface TechItem {
  label: string;
}

export interface CaseStudy {
  slug: string;
  name: Localized;
  shortDesc: Localized;
  problem: Localized;
  solution: Localized;
  architectureOverview: Localized;
  techStack: TechItem[];
  challenges: Localized<string[]>;
  results: Localized<string[]>;
  tags: string[];
  gradient: string;
  repoUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  confidential?: boolean;
  dateLabel: Localized;
}

export interface Achievement {
  title: Localized;
  description: Localized;
  year: string;
  icon: string;
}
