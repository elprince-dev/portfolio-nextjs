#!/usr/bin/env node
/**
 * Generates the Open Graph preview card (public/og-image.png, 1200×630) used
 * by LinkedIn/Twitter/iMessage link previews (Req 15.2).
 *
 * Design matches the site: true-black background with a rose ambient glow,
 * the display name in white with a rose accent, the title line, the site
 * URL, and the profile photo in a rose ring on the right.
 *
 * Usage: node scripts/generate-og-image.mjs
 */

import { readFile } from "node:fs/promises";
import sharp from "sharp";

const W = 1200;
const H = 630;
const OUT = "public/og-image.png";

// Circular-cropped profile photo, embedded as base64.
const PHOTO_SIZE = 300;
const photo = await sharp("public/myPhoto.png")
  .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: "cover" })
  .png()
  .toBuffer();
const photoB64 = photo.toString("base64");

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <radialGradient id="glow" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#d4547e" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#d4547e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d4547e"/>
      <stop offset="100%" stop-color="#e07a9c"/>
    </linearGradient>
    <clipPath id="photoClip">
      <circle cx="960" cy="315" r="150"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0a0a0b"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Accent bar -->
  <rect x="84" y="208" width="76" height="10" rx="5" fill="url(#accent)"/>

  <!-- Name -->
  <text x="84" y="308" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="76" fill="#f5f5f7">Mohammad</text>
  <text x="84" y="398" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="76" fill="#e07a9c">El Prince</text>

  <!-- Title -->
  <text x="84" y="470" font-family="DejaVu Sans, sans-serif" font-size="34" fill="#a7a7b0">Agentic AI Software Engineer</text>

  <!-- URL chip -->
  <text x="84" y="546" font-family="DejaVu Sans Mono, monospace" font-size="24" fill="#7c7c85">www.elprince.dev</text>

  <!-- Photo ring + photo -->
  <circle cx="960" cy="315" r="160" fill="none" stroke="#d4547e" stroke-width="5" opacity="0.9"/>
  <circle cx="960" cy="315" r="172" fill="none" stroke="#d4547e" stroke-width="2" opacity="0.35"/>
  <image x="810" y="165" width="${PHOTO_SIZE}" height="${PHOTO_SIZE}" clip-path="url(#photoClip)"
         xlink:href="data:image/png;base64,${photoB64}"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}x${meta.height})`);
