/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.musclewiki.com",
      },
    ],
  },
};

module.exports = nextConfig;
