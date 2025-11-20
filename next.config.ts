import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
