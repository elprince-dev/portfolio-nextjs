/**
 * Design tokens — the single source of truth for the portfolio Design_System.
 *
 * These tokens describe the typography scale, heading hierarchy, spacing scale
 * (including the large section-spacing value), light/dark color palettes,
 * gradients, and glassmorphism / elevated surface styles. They are mirrored by
 * the Tailwind theme extension in `tailwind.config.ts` and the CSS custom
 * properties in `src/styles/globals.css`, so every section renders exclusively
 * through these values.
 *
 * Requirements: 11.1 (single source of truth for tokens), 11.5 (consistent
 * typographic heading hierarchy), 11.6 (large section spacing value).
 */

/**
 * A semantic color palette for a single Theme (light or dark). Every value is a
 * CSS color string. Pairings (e.g. `textPrimary` over `background`) are chosen
 * to meet WCAG AA contrast; this is validated by a later token-audit task.
 */
export interface Palette {
  /** Page background. */
  background: string;
  /** Default surface (cards, panels) layered over the background. */
  surface: string;
  /** Raised surface used for elevated treatments (e.g. certifications). */
  surfaceElevated: string;
  /** Hairline border / divider color. */
  border: string;
  /** Primary body and heading text. */
  textPrimary: string;
  /** Secondary text (supporting copy). */
  textSecondary: string;
  /** Muted text (captions, metadata). */
  textMuted: string;
  /** Brand accent used for interactive and emphasis elements. */
  accent: string;
  /** Foreground color rendered on top of the accent. */
  accentForeground: string;
}

/**
 * The complete typed description of the Design_System tokens.
 */
export interface DesignTokens {
  typography: {
    /** Named font-size steps mapped to CSS length values. */
    scale: Record<string, string>;
    /**
     * Ordered list of typography scale keys defining the heading hierarchy
     * from h1 (index 0) through h6 (index 5). Drives consistent heading
     * sizing across all sections (Req 11.5).
     */
    headingHierarchy: string[];
  };
  /**
   * Named spacing steps mapped to CSS length values. Includes the large
   * `section` value used to separate primary sections (Req 11.6).
   */
  spacing: Record<string, string>;
  color: {
    light: Palette;
    dark: Palette;
  };
  /** Named gradient definitions as CSS background-image values. */
  gradients: Record<string, string>;
  /** Glassmorphism and elevated surface style descriptions. */
  surfaces: {
    /** Glassmorphism surface: translucent, blurred, hairline-bordered. */
    glass: string;
    /** Elevated surface: opaque with layered drop shadow. */
    elevated: string;
  };
}

/** Light Theme palette. */
export const lightPalette: Palette = {
  background: "#ffffff",
  surface: "#f8fafc",
  surfaceElevated: "#ffffff",
  border: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#475569",
  accent: "#4f46e5",
  accentForeground: "#ffffff",
};

/** Dark Theme palette. */
export const darkPalette: Palette = {
  background: "#0b1120",
  surface: "#111827",
  surfaceElevated: "#1e293b",
  border: "#334155",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  accent: "#818cf8",
  accentForeground: "#0b1120",
};

/**
 * The canonical design tokens consumed by the Tailwind theme extension and the
 * presentation layer.
 */
export const designTokens: DesignTokens = {
  typography: {
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
    },
    // h1 -> h6 mapping into the scale above.
    headingHierarchy: ["7xl", "5xl", "4xl", "3xl", "2xl", "xl"],
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
    // Large section spacing value separating primary sections (Req 11.6).
    section: "8rem",
  },
  color: {
    light: lightPalette,
    dark: darkPalette,
  },
  gradients: {
    brand:
      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
    subtle:
      "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0) 100%)",
    radial: "radial-gradient(var(--tw-gradient-stops))",
    conic:
      "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  },
  surfaces: {
    glass:
      "background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.12);",
    elevated:
      "box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 12px 32px -8px rgba(15, 23, 42, 0.18);",
  },
};

export default designTokens;
