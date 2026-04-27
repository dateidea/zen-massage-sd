import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages only when GITHUB_PAGES=true (set by .github/workflows/deploy.yml).
// Vercel and local dev use defaults.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/zen-massage-sd" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  trailingSlash: true,
  ...(isPages && { output: "export", basePath, assetPrefix: basePath }),
  images: { formats: ["image/avif", "image/webp"], ...(isPages && { unoptimized: true }) },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
