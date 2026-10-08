import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Printed keycaps were discontinued; metal keycaps are the remaining keycap line.
    return [{ source: "/explore/keycaps", destination: "/explore/metal", permanent: true }];
  },
};

export default nextConfig;
