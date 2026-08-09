import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignora erros de TypeScript apenas durante o build da Vercel
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;