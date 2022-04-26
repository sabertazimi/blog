const NextPwa = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['components', 'config', 'hooks', 'layouts', 'lib', 'pages', 'types'],
  },
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'zh-CN',
  },
  pwa: {
    dest: 'public',
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = NextPwa(nextConfig);
