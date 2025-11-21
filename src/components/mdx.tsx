'use client'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
  return (
    <div
      className={cn(
        'prose dark:prose-invert prose-lg max-w-none',
        'prose-headings:font-semibold',
        'prose-inline-code:before:content-none prose-inline-code:after:content-none',
        'prose-inline-code:rounded-md prose-inline-code:border prose-inline-code:border-border',
        'prose-inline-code:bg-muted prose-inline-code:px-1.5 prose-inline-code:py-0.5',
        'prose-inline-code:font-semibold prose-inline-code:text-foreground prose-inline-code:font-mono',
      )}
    >
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  )
}

export default MDX
