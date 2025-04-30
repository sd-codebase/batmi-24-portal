import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any domain
      },
      {
        protocol: "http",
        hostname: "**", // Allow HTTP images too
      },
    ],
  },
  // Configure dynamic behavior for specific routes
  experimental: {
    // Ensure dynamic routes are server-rendered and not statically generated
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
