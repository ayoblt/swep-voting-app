/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swep7-production.up.railway.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
// https://placehold.co/600x400
