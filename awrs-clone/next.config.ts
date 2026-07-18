import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project is nested inside another app that has its own lockfile, so we
  // pin Turbopack's root to this directory to avoid incorrect root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
