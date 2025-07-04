/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/sofia-cv" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/sofia-cv/" : "",
}

module.exports = nextConfig
