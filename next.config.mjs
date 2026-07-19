/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Inline critical CSS into the document (via critters) so first paint
    // does not wait on stylesheet round-trips — required to hold the FCP
    // budget on simulated mobile (Req 13.5).
    optimizeCss: true,
    // Rewrite barrel-file imports (react-icons) to direct module imports,
    // trimming unused icon code from the client bundles (Req 13.1).
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
