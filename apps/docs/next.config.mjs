/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mayvio-ui/react'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
