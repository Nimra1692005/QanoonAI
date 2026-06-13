/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['groq-sdk'],
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
};

module.exports = nextConfig;
