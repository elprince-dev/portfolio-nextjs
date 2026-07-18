"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  Background,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { DiagramFlowSpec, FlowEdgeSpec } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * FlowDiagram — the interactive architecture diagram renderer (React Flow)
 * with official AWS service icons.
 *
 * Nodes are glass cards (icon + label + sublabel) positioned by the authored
 * {@link DiagramFlowSpec}; edges are bezier connectors with arrowheads,
 * dashed for "provisions"-style relationships. Supports drag-to-pan and node
 * dragging; scroll zoom is disabled so the page scroll is never hijacked.
 * Nothing animates on its own (Req 12.5) — all motion is user-driven.
 *
 * Initial framing keeps nodes readable on every screen: when the whole
 * diagram fits at a readable zoom the view is fitted; on narrow screens
 * (phones) the view instead fits the diagram HEIGHT at a readable zoom and
 * starts at the left edge, so the visitor pans horizontally through the
 * left-to-right flow — nodes never shrink below {@link MIN_READABLE_ZOOM}.
 *
 * Decorative only: the parent {@link ArchitectureDiagram} figure carries the
 * descriptive alt text for assistive technology (Req 14.2).
 */

const SIDE_POSITION: Record<string, Position> = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

/** Invisible connection handles on all four sides of a node. */
const HANDLE_CLASSES = "!h-1.5 !w-1.5 !border-0 !bg-transparent !opacity-0";

type AwsNodeData = { label: string; sublabel?: string; icon?: string };

/** Glass node card with an AWS service icon. */
function AwsNode({ data }: NodeProps<Node<AwsNodeData>>) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[rgba(0,0,0,0.14)] bg-[rgba(255,255,255,0.85)] px-5 py-3.5 shadow-lg backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_22px_var(--color-rose-glow)] dark:border-[rgba(255,255,255,0.14)] dark:bg-[rgba(20,20,24,0.85)]">
      {data.icon && (
        // eslint-disable-next-line @next/next/no-img-element -- small static svg
        <img
          src={
            data.icon.startsWith("/")
              ? data.icon
              : `/aws/${data.icon}.svg`
          }
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-lg object-contain"
        />
      )}
      <div className="min-w-0">
        <p className="text-base font-semibold leading-tight text-[var(--color-text-primary)]">
          {data.label}
        </p>
        {data.sublabel && (
          <p className="mt-1 text-xs leading-tight text-[var(--color-text-muted)]">
            {data.sublabel}
          </p>
        )}
      </div>

      {/* Connection points on every side (targets and sources). */}
      {(["left", "right", "top", "bottom"] as const).map((side) => (
        <Handle
          key={`t-${side}`}
          id={`t-${side}`}
          type="target"
          position={SIDE_POSITION[side]}
          className={HANDLE_CLASSES}
          isConnectable={false}
        />
      ))}
      {(["left", "right", "top", "bottom"] as const).map((side) => (
        <Handle
          key={`s-${side}`}
          id={`s-${side}`}
          type="source"
          position={SIDE_POSITION[side]}
          className={HANDLE_CLASSES}
          isConnectable={false}
        />
      ))}
    </div>
  );
}

const NODE_TYPES = { aws: AwsNode };

function toEdge(spec: FlowEdgeSpec, index: number): Edge {
  return {
    id: `e-${index}-${spec.from}-${spec.to}`,
    source: spec.from,
    target: spec.to,
    sourceHandle: `s-${spec.fromSide ?? "right"}`,
    targetHandle: `t-${spec.toSide ?? "left"}`,
    label: spec.label,
    labelStyle: {
      fill: "var(--color-text-secondary)",
      fontSize: 11,
      fontFamily: "var(--font-mono)",
    },
    labelBgStyle: { fill: "var(--color-background)", fillOpacity: 0.85 },
    labelBgPadding: [4, 2] as [number, number],
    labelBgBorderRadius: 4,
    style: {
      stroke: "#8b8b94",
      strokeWidth: 1.5,
      ...(spec.dashed ? { strokeDasharray: "6 5", opacity: 0.7 } : {}),
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#8b8b94",
      width: 16,
      height: 16,
    },
  };
}

/** Nodes never render below this zoom — pan instead of shrinking. */
const MIN_READABLE_ZOOM = 0.68;
/** Estimated node footprint used to compute the diagram bounds. */
const NODE_WIDTH = 260;
const NODE_HEIGHT = 90;
const BOUNDS_MARGIN = 24;

const HINT_LABEL: Record<Locale, string> = {
  en: "Drag to explore",
  ar: "اسحب للاستكشاف",
};

export function FlowDiagram({
  flow,
  locale = "en",
}: {
  flow: DiagramFlowSpec;
  locale?: Locale;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const nodes = useMemo<Node<AwsNodeData>[]>(
    () =>
      flow.nodes.map((node) => ({
        id: node.id,
        type: "aws",
        position: { x: node.x, y: node.y },
        data: {
          label: node.label,
          sublabel: node.sublabel,
          icon: node.icon,
        },
      })),
    [flow],
  );

  const edges = useMemo<Edge[]>(() => flow.edges.map(toEdge), [flow]);

  /**
   * Initial framing. Fit the whole diagram when that keeps nodes readable;
   * otherwise (narrow screens) fit the height at a readable zoom, anchored
   * at the left edge, and let the visitor pan through the flow.
   */
  const handleInit = useCallback(
    (instance: ReactFlowInstance<Node<AwsNodeData>, Edge>) => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return; // jsdom / hidden

      const xs = flow.nodes.map((n) => n.x);
      const ys = flow.nodes.map((n) => n.y);
      const boundsWidth =
        Math.max(...xs) - Math.min(...xs) + NODE_WIDTH + BOUNDS_MARGIN * 2;
      const boundsHeight =
        Math.max(...ys) - Math.min(...ys) + NODE_HEIGHT + BOUNDS_MARGIN * 2;

      const fitZoom = Math.min(width / boundsWidth, height / boundsHeight);
      if (fitZoom >= MIN_READABLE_ZOOM) {
        instance.fitView({ padding: 0.1 });
        return;
      }

      // Readable mode: fit the height (clamped to the readable floor) and
      // start at the diagram's left edge.
      const zoom = Math.min(
        Math.max(height / boundsHeight, MIN_READABLE_ZOOM),
        1,
      );
      instance.setViewport({
        x: BOUNDS_MARGIN * zoom,
        y: Math.max((height - boundsHeight * zoom) / 2, 0),
        zoom,
      });
    },
    [flow],
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative h-[26rem] overflow-hidden rounded-lg border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.4)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.02)] sm:h-[28rem]"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        onInit={handleInit}
        minZoom={0.5}
        maxZoom={1.6}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        panOnDrag
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: false }}
      >
        <Background gap={26} size={1.4} color="var(--color-border)" />
      </ReactFlow>

      {/* Interaction hint (the canvas is pannable, especially on phones). */}
      <span className="pointer-events-none absolute bottom-2 start-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
        {HINT_LABEL[locale]}
      </span>
    </div>
  );
}

export default FlowDiagram;
