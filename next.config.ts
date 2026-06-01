import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next_build",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

