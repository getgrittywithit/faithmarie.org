import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/about/ai-transparency',
        destination: '/about',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
