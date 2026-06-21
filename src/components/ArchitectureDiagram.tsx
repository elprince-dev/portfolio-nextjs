import type { DiagramSpec } from "@/content/types";

/**
 * ArchitectureDiagram — renders a project's architecture or data-flow diagram
 * (Req 3.3) with descriptive alt text (Req 14.2).
 *
 * The diagram is exposed to assistive technology as a single image via
 * `role="img"` and `aria-label={diagram.alt}`, so screen-reader users receive
 * the authored descriptive alt text rather than the raw diagram source. The
 * structured source is rendered as preformatted text for sighted users and is
 * hidden from the accessibility tree (`aria-hidden`) to avoid duplicating the
 * description.
 */

export interface ArchitectureDiagramProps {
  diagram: DiagramSpec;
  className?: string;
}

const KIND_LABEL: Record<DiagramSpec["kind"], string> = {
  architecture: "Architecture diagram",
  "data-flow": "Data-flow diagram",
};

export function ArchitectureDiagram({
  diagram,
  className,
}: ArchitectureDiagramProps) {
  return (
    <figure
      role="img"
      aria-label={diagram.alt}
      data-diagram-kind={diagram.kind}
      className={className ? `diagram ${className}` : "diagram"}
    >
      <span className="sr-only">{diagram.alt}</span>
      <pre
        aria-hidden="true"
        className="diagram-source overflow-x-auto rounded-lg bg-[var(--color-surface)] p-4 text-xs leading-relaxed text-[var(--color-text-primary)]"
      >
        <code>{diagram.source}</code>
      </pre>
      <figcaption className="mt-2 text-xs text-[var(--color-text-secondary)]">
        {KIND_LABEL[diagram.kind]}
      </figcaption>
    </figure>
  );
}

export default ArchitectureDiagram;
