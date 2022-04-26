/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['components', 'config', 'hooks', 'layouts', 'lib', 'pages', 'types'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
