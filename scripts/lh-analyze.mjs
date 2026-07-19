// Temporary Lighthouse report analyzer (safe to delete).
import { readFileSync } from "node:fs";

const r = JSON.parse(readFileSync(process.argv[2] ?? "/tmp/lh-en.json", "utf8"));

console.log("perf score:", r.categories.performance.score);
for (const id of [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
])
  console.log(" ", id, r.audits[id]?.displayValue);

const el = r.audits["largest-contentful-paint-element"];
console.log("\n--- LCP element details:");
for (const table of el?.details?.items ?? []) {
  for (const row of table.items ?? []) {
    if (row.node) console.log("  node:", row.node.snippet?.slice(0, 200));
    if (row.phase) console.log("  phase:", row.phase, Math.round(row.timing) + "ms");
  }
}

console.log("\n--- font-display:");
for (const i of r.audits["font-display"]?.details?.items ?? [])
  console.log(" ", i.url.split("/").pop(), i.wastedMs + "ms");

console.log("\n--- render-blocking:");
for (const i of r.audits["render-blocking-resources"]?.details?.items ?? [])
  console.log(" ", i.url.replace("http://localhost:3000", ""), i.wastedMs + "ms");

console.log("\n--- unused JS:");
for (const i of r.audits["unused-javascript"]?.details?.items ?? [])
  console.log(
    " ",
    i.url.replace("http://localhost:3000", ""),
    Math.round(i.totalBytes / 1024) + "KB total,",
    Math.round(i.wastedBytes / 1024) + "KB unused",
  );

console.log("\n--- long tasks / bootup top 5:");
for (const i of (r.audits["bootup-time"]?.details?.items ?? []).slice(0, 5))
  console.log(
    " ",
    i.url.replace("http://localhost:3000", "").slice(0, 80),
    Math.round(i.total) + "ms",
  );
