const NextPwa = require('next-pwa');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['components', 'config', 'hooks', 'layouts', 'lib', 'pages', 'types'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  pwa: {
    dest: 'public',
    disable: !isProduction,
  },
  reactStrictMode: true,
  // TODO: enable SWC minifier when it's ready.
  // swcMinify: isProduction,
};

module.exports = NextPwa(nextConfig);
