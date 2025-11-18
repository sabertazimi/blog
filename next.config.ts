import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
