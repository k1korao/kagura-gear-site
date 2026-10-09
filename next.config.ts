import type { NextConfig } from "next";

// /explore/metal remains a legacy alias. Redirecting it back to /explore/keycaps
// would loop for visitors who cached the previous permanent redirect the other way.
const nextConfig: NextConfig = {};

export default nextConfig;
