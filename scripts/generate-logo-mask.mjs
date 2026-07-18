#!/usr/bin/env node
/**
 * One-off: extract the navbar logo mark from the source logo PNG as a
 * single-color mask.
 *
 * The source is an RGB image (logo on a solid background, no alpha). This
 * script converts luminance to alpha — dark logo on a light background
 * becomes an opaque white shape on transparency (or the inverse for a dark
 * background), with a small floor to drop near-background noise — then trims
 * the empty border and downsizes to 512px.
 *
 * The output (public/logo/logo-mask.png) is consumed by the `.logo-mark`
 * CSS class as a `mask-image`, so the mark renders in any theme color.
 *
 * Usage: node scripts/generate-logo-mask.mjs "<source.png>"
 */

import sharp from "sharp";

const SRC =
  process.argv[2] ?? "public/logo/ChatGPT Image Jul 18, 2026, 03_53_39 PM.png";
const OUT = "public/logo/logo-mask.png";

/** Alpha values at or below this are treated as background noise. */
const NOISE_FLOOR = 28;

const { data, info } = await sharp(SRC)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Decide polarity from the corners: light background => dark pixels are the
// logo; dark background => light pixels are the logo.
const corners = [
  data[0],
  data[info.width - 1],
  data[(info.height - 1) * info.width],
  data[info.height * info.width - 1],
];
const lightBackground =
  corners.reduce((sum, v) => sum + v, 0) / corners.length > 127;

// White RGBA image whose alpha is the extracted logo shape.
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  let alpha = lightBackground ? 255 - data[i] : data[i];
  if (alpha <= NOISE_FLOOR) alpha = 0;
  rgba[i * 4] = 255;
  rgba[i * 4 + 1] = 255;
  rgba[i * 4 + 2] = 255;
  rgba[i * 4 + 3] = alpha;
}

await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
  .resize(512, 512, { fit: "inside" })
  .png()
  .toFile(OUT);

console.log(
  `Wrote ${OUT} (${lightBackground ? "dark-on-light" : "light-on-dark"} source)`,
);
