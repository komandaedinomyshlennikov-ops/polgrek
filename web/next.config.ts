import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Static export for GitHub Pages / any static host
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost", "0.0.0.0"],
  turbopack: {
    root,
  },
  // App is served at domain root (polgrek.site) — no basePath
};

export default nextConfig;
