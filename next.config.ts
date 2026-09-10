import type { NextConfig } from "next";

// Ім'я репозиторію — стає частиною адреси GitHub Pages:
// https://andriytomusiak.github.io/autodetailing-landing/
const repoName = "autodetailing-landing";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Статичний експорт для GitHub Pages (папка out/)
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    // GitHub Pages не має сервера оптимізації зображень
    unoptimized: true,
  },
};

export default nextConfig;
