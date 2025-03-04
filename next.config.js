/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.graphassets.com',
      'eu-west-2.cdn.hygraph.com',
      'hygraph.com'
    ],
  },
};

module.exports = nextConfig;
