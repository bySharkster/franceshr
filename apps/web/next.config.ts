import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Modern JavaScript - no unnecessary polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize bundle
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "motion"],
    optimizeCss: true,
  },
  // Modern browser targets
  transpilePackages: [],
  // Production optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
