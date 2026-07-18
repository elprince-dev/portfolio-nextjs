import type { DiagramSpec } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { FlowDiagram } from "@/components/FlowDiagram";
import { MermaidDiagram } from "@/components/MermaidDiagram";

/**
 * ArchitectureDiagram — renders a project's architecture or data-flow diagram
 * (Req 3.3) with descriptive alt text (Req 14.2).
 *
 * The diagram is exposed to assistive technology as a single image via
 * `role="img"` and `aria-label={diagram.alt}`, so screen-reader users receive
 * the authored descriptive alt text rather than the raw diagram source. The
 * visual is rendered from the Mermaid source by {@link MermaidDiagram}
 * (client-side, theme-aware, falling back to the preformatted source while
 * loading or on failure) and is hidden from the accessibility tree
 * (`aria-hidden`) to avoid duplicating the description.
 */

export interface ArchitectureDiagramProps {
  diagram: DiagramSpec;
  className?: string;
  locale?: Locale;
}

const KIND_LABEL: Record<Locale, Record<DiagramSpec["kind"], string>> = {
  en: {
    architecture: "Architecture diagram",
    "data-flow": "Data-flow diagram",
  },
  ar: {
    architecture: "مخطط البنية المعمارية",
    "data-flow": "مخطط تدفق البيانات",
  },
};

export function ArchitectureDiagram({
  diagram,
  className,
  locale = "en",
}: ArchitectureDiagramProps) {
  return (
    <figure
      role="img"
      aria-label={diagram.alt}
      data-diagram-kind={diagram.kind}
      className={className ? `diagram ${className}` : "diagram"}
    >
      <span className="sr-only">{diagram.alt}</span>
      {diagram.flow ? (
        <FlowDiagram flow={diagram.flow} locale={locale} />
      ) : (
        <MermaidDiagram source={diagram.source} />
      )}
      <figcaption className="mt-2 text-xs text-[var(--color-text-secondary)]">
        {KIND_LABEL[locale][diagram.kind]}
      </figcaption>
    </figure>
  );
}

export default ArchitectureDiagram;
