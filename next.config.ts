import type { NextConfig } from "next";

// For GitHub Project Pages the site is served under /<repo>/.
// CI sets PAGES_BASE_PATH="/my-portfolio"; locally it stays empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // static HTML export → deployable to GitHub Pages
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
