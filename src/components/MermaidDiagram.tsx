"use client";

import { useEffect, useId, useState } from "react";

/**
 * MermaidDiagram — renders a Mermaid source string as an inline SVG diagram.
 *
 * Rendering happens client-side via a dynamic `import("mermaid")` (the
 * library is browser-only and heavy, so it stays out of the main bundle and
 * out of server rendering). The diagram is theme-aware: it renders with
 * Mermaid's dark or neutral theme to match the current `html.dark` class and
 * re-renders when the visitor toggles the theme (MutationObserver).
 *
 * While loading — or if rendering fails (e.g. jsdom in tests, or a syntax
 * error in the source) — the raw source is shown in a <pre> block instead,
 * so the content is never lost.
 */

/** Reads the current theme from the documentElement class list. */
function isDarkTheme(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );
}

export function MermaidDiagram({ source }: { source: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [dark, setDark] = useState(false);

  // Track theme changes on <html class="dark"> so the diagram re-renders
  // with matching colors.
  useEffect(() => {
    setDark(isDarkTheme());
    const observer = new MutationObserver(() => setDark(isDarkTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: dark ? "dark" : "neutral",
          fontFamily: "var(--font-sans)",
          themeVariables: dark
            ? {
                primaryColor: "#1a1a1f",
                primaryBorderColor: "rgba(255,255,255,0.3)",
                primaryTextColor: "#e7e7ea",
                lineColor: "#7c7c85",
                background: "transparent",
                mainBkg: "#1a1a1f",
                clusterBkg: "transparent",
              }
            : {
                primaryBorderColor: "rgba(0,0,0,0.35)",
                lineColor: "#5b5b64",
                background: "transparent",
              },
        });
        // The render id must be a valid CSS selector fragment.
        const renderId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${dark ? "d" : "l"}`;
        const result = await mermaid.render(renderId, source);
        if (!cancelled) {
          setSvg(result.svg);
          setFailed(false);
        }
      } catch {
        // Browser-only APIs missing (jsdom) or invalid source: fall back to
        // the raw source below.
        if (!cancelled) {
          setFailed(true);
        }
      }
    }

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [source, dark, reactId]);

  if (svg && !failed) {
    return (
      <div
        aria-hidden="true"
        className="mermaid-diagram flex justify-center overflow-x-auto rounded-lg border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.5)] p-4 dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.03)] [&_svg]:h-auto [&_svg]:max-w-full"
        // Mermaid output is generated locally from trusted authored content
        // (securityLevel "strict" additionally sanitizes labels).
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  // Loading / fallback: show the raw source so content is never lost.
  return (
    <pre
      aria-hidden="true"
      className="diagram-source overflow-x-auto rounded-lg bg-[var(--color-surface)] p-4 text-xs leading-relaxed text-[var(--color-text-primary)]"
    >
      <code>{source}</code>
    </pre>
  );
}

export default MermaidDiagram;
