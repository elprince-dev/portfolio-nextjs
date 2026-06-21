import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Surface — the shared glassmorphism / elevated surface primitive (Req 9.3, 11.1).
 *
 * Renders the design-system surface utility classes defined in
 * `src/styles/globals.css` (`.surface-glass` / `.surface-elevated`), which are
 * backed by the CSS custom properties mirroring `surfaces.glass` /
 * `surfaces.elevated` in `src/content/tokens.ts`. All elevated and glass
 * treatments across sections (e.g. certifications) render through this
 * component so the surface styling has a single source of truth.
 */

/** Selectable surface treatments backed by the design tokens. */
export type SurfaceVariant = "glass" | "elevated";

/** Maps each variant to its globals.css component utility class. */
const VARIANT_CLASS: Record<SurfaceVariant, string> = {
  glass: "surface-glass",
  elevated: "surface-elevated",
};

type SurfaceOwnProps<E extends ElementType> = {
  /** Which design-token surface treatment to render. */
  variant: SurfaceVariant;
  /**
   * Optional element/component to render as. Defaults to `div`. Keeps the
   * primitive flexible (e.g. `section`, `article`) without losing typing.
   */
  as?: E;
  /** Additional classes merged after the variant's utility class. */
  className?: string;
  children?: ReactNode;
};

/**
 * Props for {@link Surface}: its own props plus the standard props of the
 * rendered element, with collisions resolved in favor of the own props.
 */
export type SurfaceProps<E extends ElementType = "div"> = SurfaceOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof SurfaceOwnProps<E>>;

/** Merge the variant utility class with any caller-supplied className. */
function mergeClassName(variantClass: string, className?: string): string {
  return className ? `${variantClass} ${className}` : variantClass;
}

export function Surface<E extends ElementType = "div">({
  variant,
  as,
  className,
  children,
  ...rest
}: SurfaceProps<E>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={mergeClassName(VARIANT_CLASS[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Surface;
