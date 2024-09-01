/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { fileURLToPath } from "url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
        port: "",
        pathname: "/ytc/**",
      },
    ],
  },
};

export default config;
