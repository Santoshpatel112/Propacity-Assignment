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
    unoptimized: true,
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
