/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rb.gy", "res.cloudinary.com", "cdn.sanity.io"],
  },
};

module.exports = nextConfig;
