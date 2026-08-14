import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
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
