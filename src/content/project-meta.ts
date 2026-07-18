/**
 * Presentation metadata per featured project (keyed by slug) — the card
 * header/type line, release timeframe, gradient palette for the visual
 * panels, and the role line shown on the project detail page.
 */

export interface ProjectMeta {
  /** Short type/category line (card header + detail TYPE chip). */
  category: string;
  /** Release timeframe (card header + detail RELEASED chip). */
  timeframe: string;
  /** Gradient start color for visual panels. */
  from: string;
  /** Gradient end color for visual panels. */
  to: string;
  /** Role line for the detail page ROLE chip. */
  role: string;
}

export const PROJECT_META: Record<string, ProjectMeta> = {
  "noor-ai": {
    category: "AI · RAG on AWS",
    timeframe: "2026",
    from: "#065f46",
    to: "#03231c",
    role: "Solo build — design to deploy",
  },
  "quality-management-platform": {
    category: "AWS Platform",
    timeframe: "2025",
    from: "#134e4a",
    to: "#0a2321",
    role: "Software Development Engineer",
  },
  "yasmade-aws": {
    category: "E-Commerce · AWS",
    timeframe: "2024",
    from: "#312e81",
    to: "#141233",
    role: "Full-stack developer",
  },
  portfolio: {
    category: "Web · Next.js",
    timeframe: "2026",
    from: "#831843",
    to: "#2d0a1b",
    role: "Design & development",
  },
};

export const DEFAULT_META: ProjectMeta = {
  category: "Case Study",
  timeframe: "",
  from: "#27272a",
  to: "#101013",
  role: "Developer",
};

/** Resolve the presentation metadata for a project slug. */
export function getProjectMeta(slug: string): ProjectMeta {
  return PROJECT_META[slug] ?? DEFAULT_META;
}
