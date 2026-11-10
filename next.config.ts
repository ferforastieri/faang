import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack never walks up the
  // filesystem looking for a lockfile.
  turbopack: {
    root: import.meta.dirname,
  },
  // On Cloudflare the Worker has no image optimizer, so `next/image` would
  // request a route that does not exist. The brand marks already ship at a
  // fixed size and every other image is a plain asset.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
