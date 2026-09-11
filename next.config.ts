import type { NextConfig } from "next";

// Ім'я репозиторію стає частиною адреси GitHub Pages:
// https://andriytomusiak.github.io/autodetailing-landing/
const repoName = "autodetailing-landing";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
