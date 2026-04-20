import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        pathname: '/res/hashnode/image/upload/**',
      },
      // Cloudflare Images
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
    ],
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode for better performance detection
  reactStrictMode: true,
};

export default nextConfig;
