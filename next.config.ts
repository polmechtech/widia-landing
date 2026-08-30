import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ALLEGRO_CLIENT_ID: "60f9f0c6597e4eb99ba6d9c1852a9cbc",
  },
};

// Keep this config change to trigger a production rebuild after Redis was connected.
export default nextConfig;
