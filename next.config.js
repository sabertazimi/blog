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
  transpilePackages: [
    // @see https://github.com/vercel/next.js/issues/40183
    // @see https://github.com/vercel/next.js/issues/58817
    '@alisowski/next-mdx-remote',
    '@ant-design/icons',
    '@mdx-js/react',
    '@react-hook/intersection-observer',
    '@react-hook/passive-layout-effect',
    'next-mdx-remote',
  ],
};

module.exports = NextPwa(nextConfig);
