import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 90, 100],
    formats: ['image/webp', 'image/avif'],
  },
  reactStrictMode: true,

};

export default nextConfig;
