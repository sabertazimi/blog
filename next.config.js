/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'config', 'hooks', 'layouts', 'lib', 'pages', 'types'],
  },
  swcMinify: true,
};

module.exports = nextConfig;
