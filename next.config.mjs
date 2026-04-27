import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages (only when GITHUB_PAGES=true). Vercel / local dev use defaults.
const isPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isPagesBuild ? "/zen-massage-sd" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  trailingSlash: true,
  ...(isPagesBuild && {
    output: "export",
    basePath,
    assetPrefix: basePath,
  }),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isPagesBuild && { unoptimized: true }),
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
