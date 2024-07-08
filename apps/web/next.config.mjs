/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { fileURLToPath } from "url";
import { createJiti } from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./app/env');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/dashboard/:name",
      destination: "/dashboard/:name/overview",
      permanent: true,
    },
  ],
};

export default config;
