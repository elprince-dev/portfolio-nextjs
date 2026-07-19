#!/usr/bin/env node
/**
 * Generates the Open Graph preview card (public/og-image.png, 1200×630) used
 * by LinkedIn/Twitter/iMessage link previews (Req 15.2).
 *
 * Rendering pipeline: satori lays out the card (text becomes vector paths,
 * so no system fonts are needed — sharp's SVG engine renders neither <text>
 * nor embedded images reliably), then sharp rasterizes it and composites
 * the circular profile photo on top.
 *
 * Fonts: the bundled Inter woffs in scripts/assets (satori needs raw font
 * data; the site's Philosopher face is loaded by next/font at build time
 * and is not available here as a file).
 *
 * Usage: node scripts/generate-og-image.mjs
 */

import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const W = 1200;
const H = 630;
const OUT = "public/og-image.png";

// Photo geometry (shared between the satori ring and the sharp composite).
const PHOTO_SIZE = 300;
const PHOTO_CX = 950;
const PHOTO_CY = 315;

// ---------------------------------------------------------------------------
// Fonts: bundled Inter woffs.
// ---------------------------------------------------------------------------
async function loadFonts() {
  return [
    {
      name: "Brand",
      data: await readFile("scripts/assets/inter-400.woff"),
      weight: 400,
      style: "normal",
    },
    {
      name: "Brand",
      data: await readFile("scripts/assets/inter-700.woff"),
      weight: 700,
      style: "normal",
    },
  ];
}

// ---------------------------------------------------------------------------
// Card layout (satori JSX-object syntax).
// ---------------------------------------------------------------------------
const el = (type, style, children = undefined) => ({
  type,
  props: { style, ...(children !== undefined ? { children } : {}) },
});

const card = el(
  "div",
  {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#0a0a0b",
    backgroundImage:
      "radial-gradient(circle at 30% 40%, rgba(212,84,126,0.22), rgba(212,84,126,0) 65%)",
    fontFamily: "Brand",
  },
  [
    // Left column: accent bar, name, title, URL.
    el(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 84,
        width: 740,
      },
      [
        el("div", {
          width: 76,
          height: 10,
          borderRadius: 5,
          backgroundImage: "linear-gradient(90deg, #d4547e, #e07a9c)",
          marginBottom: 42,
        }),
        el(
          "div",
          { fontSize: 78, fontWeight: 700, color: "#f5f5f7", lineHeight: 1.1 },
          "Mohammad",
        ),
        el(
          "div",
          { fontSize: 78, fontWeight: 700, color: "#e07a9c", lineHeight: 1.1 },
          "El Prince",
        ),
        el(
          "div",
          { fontSize: 34, color: "#a7a7b0", marginTop: 28 },
          "Agentic AI Software Engineer",
        ),
        el(
          "div",
          { fontSize: 24, color: "#7c7c85", marginTop: 40 },
          "elprince.net",
        ),
      ],
    ),
    // Right column: rose rings around the (composited) photo slot.
    el("div", {
      position: "absolute",
      left: PHOTO_CX - PHOTO_SIZE / 2 - 10,
      top: PHOTO_CY - PHOTO_SIZE / 2 - 10,
      width: PHOTO_SIZE + 20,
      height: PHOTO_SIZE + 20,
      borderRadius: 9999,
      border: "5px solid #d4547e",
    }),
    el("div", {
      position: "absolute",
      left: PHOTO_CX - PHOTO_SIZE / 2 - 24,
      top: PHOTO_CY - PHOTO_SIZE / 2 - 24,
      width: PHOTO_SIZE + 48,
      height: PHOTO_SIZE + 48,
      borderRadius: 9999,
      border: "2px solid rgba(212,84,126,0.35)",
    }),
  ],
);

// ---------------------------------------------------------------------------
// Render: satori -> SVG (vector text) -> sharp raster + photo composite.
// ---------------------------------------------------------------------------
const svg = await satori(card, { width: W, height: H, fonts: await loadFonts() });
const base = await sharp(Buffer.from(svg)).png().toBuffer();

// Circular-cropped profile photo.
const circleMask = Buffer.from(
  `<svg width="${PHOTO_SIZE}" height="${PHOTO_SIZE}"><circle cx="${PHOTO_SIZE / 2}" cy="${PHOTO_SIZE / 2}" r="${PHOTO_SIZE / 2}" fill="#fff"/></svg>`,
);
const photo = await sharp("public/myPhoto.png")
  .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: "cover" })
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    {
      input: photo,
      left: PHOTO_CX - PHOTO_SIZE / 2,
      top: PHOTO_CY - PHOTO_SIZE / 2,
    },
  ])
  .png()
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}x${meta.height})`);
