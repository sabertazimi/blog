import process from 'node:process'
import NextPwa from 'next-pwa'

const isProduction = process.env.NODE_ENV === 'production'

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
  transpilePackages: [
    // @see https://github.com/vercel/next.js/issues/40183
    // @see https://github.com/vercel/next.js/issues/58817
    '@ant-design/icons',
    '@mdx-js/react',
    '@react-hook/intersection-observer',
    '@react-hook/passive-layout-effect',
    'next-mdx-remote',
  ],
}

export default NextPwa({
  dest: 'public',
  disable: !isProduction,
})(nextConfig)
