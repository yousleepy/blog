/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["raw.githubusercontent.com"] },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
