import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 90, 100],
    formats: ["image/webp", "image/avif"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    // Required by pdfjs-dist (used internally by react-pdf) in Next.js SSR
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
};

export default nextConfig;
