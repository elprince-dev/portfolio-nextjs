// Temporary LCP deep-dive for a Lighthouse JSON report (safe to delete).
import { readFileSync } from "node:fs";

const r = JSON.parse(readFileSync(process.argv[2] ?? "/tmp/lh-en2.json", "utf8"));

const el = r.audits["largest-contentful-paint-element"];
console.log("=== largest-contentful-paint-element ===");
console.log(JSON.stringify(el?.details ?? el, null, 1).slice(0, 2000));

console.log("\n=== prioritize-lcp-image ===");
console.log(JSON.stringify(r.audits["prioritize-lcp-image"]?.details?.items ?? [], null, 1).slice(0, 800));

console.log("\n=== network: first 12 requests ===");
const net = r.audits["network-requests"]?.details?.items ?? [];
for (const i of net.slice(0, 12))
  console.log(
    " ",
    Math.round(i.networkEndTime ?? 0) + "ms",
    (i.priority ?? "") + "",
    i.resourceType ?? "",
    (i.url ?? "").replace("http://localhost:3000", "").slice(0, 90),
  );

console.log("\n=== main thread long tasks ===");
for (const i of (r.audits["long-tasks"]?.details?.items ?? []).slice(0, 6))
  console.log(" ", Math.round(i.startTime) + "ms +", Math.round(i.duration) + "ms", (i.url ?? "").replace("http://localhost:3000", "").slice(0, 80));
