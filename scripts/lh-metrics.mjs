// Temporary: dump observed metrics + network timing from a Lighthouse report.
import { readFileSync } from "node:fs";

const r = JSON.parse(readFileSync(process.argv[2], "utf8"));
const m = r.audits.metrics?.details?.items?.[0] ?? {};
for (const k of Object.keys(m).filter((k) => /aint|nteractive|peed/.test(k)))
  console.log(k, m[k]);

console.log("\n--- network (first 25 by start):");
const reqs = r.audits["network-requests"]?.details?.items ?? [];
for (const i of reqs.slice(0, 25))
  console.log(
    " ",
    Math.round(i.networkRequestTime) + "ms",
    "+" + Math.round(i.networkEndTime - i.networkRequestTime) + "ms",
    (i.resourceType ?? "?").padEnd(10),
    Math.round((i.transferSize ?? 0) / 1024) + "KB",
    i.url.replace("http://localhost:3000", "").slice(0, 80),
  );

console.log("\n--- runWarnings:", JSON.stringify(r.runWarnings));
