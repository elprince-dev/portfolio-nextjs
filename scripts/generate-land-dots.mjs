/**
 * generate-land-dots.mjs — precomputes the dotted-earth land bitmap for the
 * About-section Globe from real geography.
 *
 * Reads Natural Earth 110m land (TopoJSON from the `world-atlas` package,
 * vendored at scripts/data/land-110m.json), rasterizes it onto a fixed
 * lon/lat grid via even-odd point-in-polygon tests, and emits
 * `src/content/land-dots.ts` with the grid parameters and one hex-encoded
 * bitmask row per latitude. The Globe component decodes that at module load,
 * so visitors pay no geometry cost.
 *
 * Regenerate with: node scripts/generate-land-dots.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const topology = JSON.parse(
  readFileSync(resolve(here, "data/land-110m.json"), "utf8"),
);

// Grid parameters (kept in sync with the emitted module).
const LON_START = -180;
const LON_END = 180;
const LAT_START = -60;
const LAT_END = 84;
const STEP = 1.2; // degrees

// ---------------------------------------------------------------------------
// Minimal TopoJSON decoding (delta-encoded quantized arcs).
// ---------------------------------------------------------------------------

const { scale, translate } = topology.transform;

/** Decode arc index i into absolute [lon, lat] points. */
function decodeArc(i) {
  const arc = topology.arcs[i];
  const points = [];
  let x = 0;
  let y = 0;
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    points.push([x * scale[0] + translate[0], y * scale[1] + translate[1]]);
  }
  return points;
}

/** Assemble a ring (list of points) from TopoJSON arc indices. */
function decodeRing(arcIndexes) {
  const ring = [];
  for (const index of arcIndexes) {
    let points =
      index >= 0 ? decodeArc(index) : decodeArc(~index).slice().reverse();
    if (ring.length > 0) points = points.slice(1); // shared endpoint
    ring.push(...points);
  }
  return ring;
}

const landObject = topology.objects.land;

/** Collect polygon arc-lists from Polygon / MultiPolygon / GeometryCollection. */
function collectPolygonArcs(geometry) {
  switch (geometry.type) {
    case "Polygon":
      return [geometry.arcs];
    case "MultiPolygon":
      return geometry.arcs;
    case "GeometryCollection":
      return geometry.geometries.flatMap(collectPolygonArcs);
    default:
      throw new Error(`Unsupported geometry type: ${geometry.type}`);
  }
}

/**
 * polygons: each is a list of rings (outer + holes), each ring a point list
 * with a precomputed bounding box for fast rejection.
 */
const polygons = collectPolygonArcs(landObject).map((polygonArcs) =>
  polygonArcs.map((ringArcs) => {
    const points = decodeRing(ringArcs);
    let minLon = Infinity,
      maxLon = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;
    for (const [lon, lat] of points) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    return { points, minLon, maxLon, minLat, maxLat };
  }),
);

// ---------------------------------------------------------------------------
// Rasterization: even-odd point-in-polygon across each polygon's rings.
// ---------------------------------------------------------------------------

function ringCrossings(lon, lat, ring) {
  if (
    lat < ring.minLat ||
    lat > ring.maxLat ||
    lon < ring.minLon ||
    lon > ring.maxLon
  ) {
    return 0;
  }
  let crossings = 0;
  const pts = ring.points;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      crossings++;
    }
  }
  return crossings;
}

function isLand(lon, lat) {
  for (const rings of polygons) {
    // Quick reject on the outer ring's bbox.
    const outer = rings[0];
    if (
      lat < outer.minLat ||
      lat > outer.maxLat ||
      lon < outer.minLon ||
      lon > outer.maxLon
    ) {
      continue;
    }
    let crossings = 0;
    for (const ring of rings) crossings += ringCrossings(lon, lat, ring);
    if (crossings % 2 === 1) return true;
  }
  return false;
}

const cols = Math.round((LON_END - LON_START) / STEP);
const rows = [];
let landCount = 0;

for (let lat = LAT_START; lat <= LAT_END; lat += STEP) {
  // Pack the row into hex, 4 columns per hex digit (MSB-first).
  let row = "";
  for (let c = 0; c < cols; c += 4) {
    let nibble = 0;
    for (let b = 0; b < 4; b++) {
      const lon = LON_START + (c + b) * STEP;
      if (c + b < cols && isLand(lon, lat)) {
        nibble |= 1 << (3 - b);
        landCount++;
      }
    }
    row += nibble.toString(16);
  }
  rows.push(row);
}

const output = `/**
 * land-dots.ts — GENERATED by scripts/generate-land-dots.mjs. Do not edit.
 *
 * Accurate land bitmap for the dotted-earth Globe, rasterized from Natural
 * Earth 110m land polygons (world-atlas). One hex string per latitude row,
 * 4 grid columns per hex digit (MSB-first).
 */

export const LAND_GRID = {
  lonStart: ${LON_START},
  latStart: ${LAT_START},
  step: ${STEP},
  cols: ${cols},
  rows: [
${rows.map((r) => `    "${r}",`).join("\n")}
  ],
};

export default LAND_GRID;
`;

writeFileSync(resolve(here, "../src/content/land-dots.ts"), output);
console.log(
  `Wrote src/content/land-dots.ts: ${rows.length} rows x ${cols} cols, ${landCount} land dots`,
);
