import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // Loosens COOP so Firebase popups can be checked
          },
        ],
      },
    ];
  },
};

export default nextConfig;
