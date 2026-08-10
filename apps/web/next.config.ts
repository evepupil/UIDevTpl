import type { NextConfig } from "next";

const nextConfig = {
  transpilePackages: ["@uidevtpl/catalog", "@uidevtpl/design-families", "@uidevtpl/schema"]
} satisfies NextConfig;

export default nextConfig;
