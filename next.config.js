const isProduction = process.env.NODE_ENV === 'production';

const NextPwa = require('next-pwa')({
  dest: 'public',
  disable: !isProduction,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['components', 'config', 'hooks', 'layouts', 'lib', 'pages', 'types'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  reactStrictMode: true,
  swcMinify: isProduction,
};

module.exports = NextPwa(nextConfig);
