import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  // Vercel deployment optimization
  output: 'standalone',
};

export default nextConfig;
