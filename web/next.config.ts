import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages / any static host
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // App is served at domain root (polgrek.site) — no basePath
};

export default nextConfig;
