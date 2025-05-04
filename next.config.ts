import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        pathname: '/res/hashnode/image/upload/**',
      },
    ],
  }
};

export default nextConfig;
