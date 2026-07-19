"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { LAND_GRID } from "@/content/land-dots";

/**
 * Globe — a decorative dotted earth for the About timezone card.
 *
 * Landmasses come from real geography: Natural Earth 110m land polygons,
 * rasterized offline into a compact bitmap by scripts/generate-land-dots.mjs
 * and decoded here at module load. Each frame the dots on the front
 * hemisphere are orthographically projected onto the sphere. The globe
 * idles with a very slow west→east spin, dragging spins/tilts it directly,
 * and releasing a drag hands off to momentum that decays back to the idle
 * speed. Rendering runs on a canvas driven by requestAnimationFrame.
 *
 * Under prefers-reduced-motion the idle spin and momentum are disabled — the
 * globe then only moves 1:1 with an active drag (Req 12.3).
 */

const VIEW = 260; // logical drawing size
const R = 116; // sphere radius
const CX = 130;
const CY = 130;
const DOT_RADIUS = 0.75;
const DOT_COLOR = "#e07a9c";
const AUTO_VELOCITY = 0.002; // idle spin, degrees per ms (≈2°/s)
const MOMENTUM_TAU = 500; // ms time-constant for flick decay
const MAX_VELOCITY = 1.2; // deg/ms clamp for wild flicks

/** Home-base marker: Milton, ON (approx). Precomputed spherical terms. */
const MARKER_LAT = 43.51;
const MARKER_LON = -79.88;
const MARKER_LON_RAD = (MARKER_LON * Math.PI) / 180;
const MARKER_SIN_LAT = Math.sin((MARKER_LAT * Math.PI) / 180);
const MARKER_COS_LAT = Math.cos((MARKER_LAT * Math.PI) / 180);
/** Pulse ring period (ms); a user-approved looping accent (Req 12.5
 * exception) — frozen under prefers-reduced-motion. */
const MARKER_PULSE_MS = 2200;

/**
 * Land dots decoded from the generated Natural Earth bitmap (module scope:
 * decoded once). Each hex digit packs 4 longitude columns, MSB-first.
 */
const DOT_LON: number[] = [];
const DOT_SIN: number[] = [];
const DOT_COS: number[] = [];
{
  const { lonStart, latStart, step, cols, rows } = LAND_GRID;
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const lat = latStart + r * step;
    const latRad = (lat * Math.PI) / 180;
    const sinLat = Math.sin(latRad);
    const cosLat = Math.cos(latRad);
    for (let c = 0; c < cols; c++) {
      const nibble = parseInt(row[c >> 2], 16);
      if ((nibble >> (3 - (c & 3))) & 1) {
        DOT_LON.push(((lonStart + c * step) * Math.PI) / 180);
        DOT_SIN.push(sinLat);
        DOT_COS.push(cosLat);
      }
    }
  }
}

export function Globe({
  markerLabel = "Milton, ON",
}: {
  /** Callout label shown beside the home-base marker (localized). */
  markerLabel?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Default view centers the Americas (Toronto ≈ 79°W) with a slight tilt.
  const rotation = useRef(79);
  const tilt = useRef(20);
  const velocity = useRef(AUTO_VELOCITY); // deg/ms, horizontal
  const dragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const visible = useRef(true);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const css = canvas.clientWidth || VIEW;
    const px = Math.round(css * dpr);
    if (canvas.width !== px) {
      canvas.width = px;
      canvas.height = px;
    }
    const scale = px / VIEW;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, VIEW, VIEW);

    // Theme-aware colors from the CSS custom properties on the canvas.
    const styles = getComputedStyle(canvas);
    const cssVar = (name: string, fallback: string) =>
      styles.getPropertyValue(name).trim() || fallback;
    const shadeHi = cssVar("--globe-hi", "#232327");
    const shadeMid = cssVar("--globe-mid", "#101013");
    const shadeLo = cssVar("--globe-lo", "#050506");
    const dotColor = cssVar("--globe-dot", DOT_COLOR);
    const haloColor = cssVar("--globe-halo", "rgba(255,255,255,0.09)");
    const rimColor = cssVar("--globe-rim", "rgba(255,255,255,0.16)");
    const borderColor = cssVar("--color-border", "#242424");

    // Outer halo.
    const halo = ctx.createRadialGradient(CX, CY, R * 0.94, CX, CY, R * 1.12);
    halo.addColorStop(0, haloColor);
    halo.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // Sphere body.
    const shade = ctx.createRadialGradient(CX - 36, CY - 42, 10, CX, CY, R);
    shade.addColorStop(0, shadeHi);
    shade.addColorStop(0.55, shadeMid);
    shade.addColorStop(1, shadeLo);
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = shade;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Land dots: longitude spin, then pitch tilt around the X axis.
    const rot = (rotation.current * Math.PI) / 180;
    const t = (tilt.current * Math.PI) / 180;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    ctx.fillStyle = dotColor;
    for (let i = 0; i < DOT_LON.length; i++) {
      const lon = DOT_LON[i] + rot;
      const x = DOT_COS[i] * Math.sin(lon);
      const z0 = DOT_COS[i] * Math.cos(lon);
      const y0 = DOT_SIN[i];
      const y = y0 * ct - z0 * st;
      const z = y0 * st + z0 * ct;
      if (z <= 0.02) continue;
      ctx.globalAlpha = 0.1 + 0.42 * z;
      ctx.beginPath();
      ctx.arc(CX + R * x, CY - R * y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Home-base marker (Milton, ON): rotates with the sphere and hides
    // behind the horizon. A mint core with a soft glow and an expanding
    // pulse ring; the pulse freezes under prefers-reduced-motion.
    {
      const lon = MARKER_LON_RAD + rot;
      const mx = MARKER_COS_LAT * Math.sin(lon);
      const mz0 = MARKER_COS_LAT * Math.cos(lon);
      const my0 = MARKER_SIN_LAT;
      const my = my0 * ct - mz0 * st;
      const mz = my0 * st + mz0 * ct;
      if (mz > 0.05) {
        const px2 = CX + R * mx;
        const py2 = CY - R * my;
        const markerColor = cssVar("--color-mint", "#00d294");
        const depth = 0.55 + 0.45 * mz; // fade slightly toward the edge

        // Expanding pulse ring.
        const phase = prefersReducedMotion
          ? 0.35
          : (performance.now() % MARKER_PULSE_MS) / MARKER_PULSE_MS;
        ctx.beginPath();
        ctx.arc(px2, py2, 3 + 9 * phase, 0, Math.PI * 2);
        ctx.strokeStyle = markerColor;
        ctx.globalAlpha = depth * 0.55 * (1 - phase);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Soft glow.
        const glow = ctx.createRadialGradient(px2, py2, 0, px2, py2, 9);
        glow.addColorStop(0, markerColor);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = depth * 0.5;
        ctx.beginPath();
        ctx.arc(px2, py2, 9, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot with a bright center.
        ctx.globalAlpha = depth;
        ctx.beginPath();
        ctx.arc(px2, py2, 3, 0, Math.PI * 2);
        ctx.fillStyle = markerColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px2, py2, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Labeled callout: a small glass pill anchored to the marker by a
        // short leader line. Fades with depth and hides near the horizon so
        // it never floats detached from its dot.
        if (mz > 0.3 && markerLabel) {
          const fontFamily = styles.fontFamily || "system-ui, sans-serif";
          ctx.font = `600 9.5px ${fontFamily}`;
          const textWidth = ctx.measureText(markerLabel).width;
          const padX = 7;
          const pillW = textWidth + padX * 2;
          const pillH = 17;
          // Place up-right of the marker; flip left near the right edge.
          const flip = px2 + 14 + pillW > VIEW - 6;
          const pillX = flip ? px2 - 14 - pillW : px2 + 14;
          const pillY = py2 - 26;
          const labelAlpha = Math.min(1, (mz - 0.3) / 0.35) * depth;

          // Leader line from the dot to the pill.
          ctx.globalAlpha = labelAlpha * 0.6;
          ctx.strokeStyle = markerColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px2, py2 - 4);
          ctx.lineTo(flip ? pillX + pillW : pillX, pillY + pillH / 2);
          ctx.stroke();

          // Glass pill.
          ctx.globalAlpha = labelAlpha;
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillW, pillH, 8.5);
          ctx.fillStyle = cssVar("--surface-glass-bg", "rgba(20,20,24,0.8)");
          ctx.fill();
          ctx.strokeStyle = markerColor;
          ctx.globalAlpha = labelAlpha * 0.7;
          ctx.stroke();

          // Label text.
          ctx.globalAlpha = labelAlpha;
          ctx.fillStyle = cssVar("--color-text-primary", "#e7e7ea");
          ctx.textBaseline = "middle";
          ctx.textAlign = "left";
          ctx.fillText(markerLabel, pillX + padX, pillY + pillH / 2 + 0.5);
        }
        ctx.globalAlpha = 1;
      }
    }

    // Rim light: brightest at the equatorial edges, dark at the top.
    const rim = ctx.createLinearGradient(0, CY - R, 0, CY + R);
    rim.addColorStop(0, "transparent");
    rim.addColorStop(0.5, rimColor);
    rim.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(CX, CY, R - 1, 0, Math.PI * 2);
    ctx.strokeStyle = rim;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Animation loop: idle spin + momentum decay; 1:1 dragging bypasses it.
  useEffect(() => {
    let rafId: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      if (visible.current) {
        if (!dragging.current) {
          const target = prefersReducedMotion ? 0 : AUTO_VELOCITY;
          // Ease the current velocity toward the idle speed.
          velocity.current =
            target + (velocity.current - target) * Math.exp(-dt / MOMENTUM_TAU);
          if (Math.abs(velocity.current) > 1e-6) {
            rotation.current += velocity.current * dt;
            draw();
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    draw();
    rafId = requestAnimationFrame(tick);

    const canvas = canvasRef.current;
    let observer: IntersectionObserver | undefined;
    if (canvas && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        visible.current = entry.isIntersecting;
        // Repaint when scrolled back into view.
        if (entry.isIntersecting) draw();
      });
      observer.observe(canvas);
    }

    // The idle loop only repaints while the globe is moving, so a theme
    // toggle would otherwise leave stale colors when motion is reduced.
    // Watch the html class (next-themes) and repaint on change.
    let themeObserver: MutationObserver | undefined;
    if (typeof MutationObserver !== "undefined") {
      themeObserver = new MutationObserver(() => draw());
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      themeObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    velocity.current = 0;
    lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!dragging.current || !lastPointer.current) return;
    const now = performance.now();
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const dt = Math.max(now - lastPointer.current.t, 1);

    rotation.current += dx * 0.5;
    tilt.current = Math.max(-89, Math.min(89, tilt.current + dy * 0.4));
    // Track flick velocity for the momentum hand-off.
    velocity.current = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, (dx * 0.5) / dt),
    );
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    draw();
  };

  const onPointerUp = () => {
    dragging.current = false;
    lastPointer.current = null;
    if (prefersReducedMotion) velocity.current = 0;
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}

export default Globe;
