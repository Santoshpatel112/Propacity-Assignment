import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "murec.com",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  async rewrites() {
    return [
      {
        source: "/about.php",
        destination: "/about",
      },
      {
        source: "/legacy.php",
        destination: "/legacy",
      },
      {
        source: "/Forest-Walk.php",
        destination: "/forest-walk",
      },
      {
        source: "/forest-walk.php",
        destination: "/forest-walk",
      },
      {
        source: "/Design-Philosophy.php",
        destination: "/design-philosophy",
      },
      {
        source: "/principles.php",
        destination: "/principles",
      },
      {
        source: "/career.php",
        destination: "/careers",
      },
      {
        source: "/news.php",
        destination: "/news",
      },
      {
        source: "/Blog.php",
        destination: "/blog",
      },
      {
        source: "/contact.php",
        destination: "/contact",
      },
    ];
  },
};

export default nextConfig;
