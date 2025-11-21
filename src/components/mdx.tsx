'use client'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'

interface MDXProps {
  source: MDXRemoteSerializeResult
}

const Editor = dynamic(async () => import('./mdx-editor'), {
  ssr: false,
})

const mdxComponents = {
  Button,
  Editor,
}

function MDX({ source }: MDXProps) {
  return <MDXRemote {...source} components={mdxComponents} />
}

export default MDX
