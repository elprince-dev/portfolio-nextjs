import type { Config } from "tailwindcss";
import { designTokens } from "./src/content/tokens";

/**
 * Tailwind theme extension wiring the centralized design tokens
 * (`src/content/tokens.ts`) into Tailwind utilities. Color values reference the
 * CSS custom properties defined in `src/styles/globals.css` so that the active
 * Theme (light/dark via the `class` strategy used by next-themes) controls the
 * resolved color at runtime.
 */
const { typography, spacing, gradients } = designTokens;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: typography.scale,
      spacing: {
        ...spacing,
        // Alias for the large section spacing value (Req 11.6).
        "section-spacing": spacing.section,
      },
      colors: {
        // Theme-aware semantic colors backed by CSS variables in globals.css.
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
      },
      backgroundImage: {
        "gradient-brand": gradients.brand,
        "gradient-subtle": gradients.subtle,
        "gradient-radial": gradients.radial,
        "gradient-conic": gradients.conic,
      },
      boxShadow: {
        elevated:
          "0 1px 2px rgba(15, 23, 42, 0.06), 0 12px 32px -8px rgba(15, 23, 42, 0.18)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
