'use client'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import MDXAdmonition from '@/components/mdx-admonition'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PostContentProps {
  source: MDXRemoteSerializeResult
}

const MDXEditor = dynamic(async () => import('@/components/mdx-editor'), {
  ssr: false,
})

const mdxComponents = {
  aside: MDXAdmonition,
  Button,
  Editor: MDXEditor,
}

function PostContent({ source }: PostContentProps) {
  return (
    <div
      className={cn(
        'prose dark:prose-invert max-w-none',
        'prose-headings:font-semibold prose-headings:text-balance',
        'prose-p:has-[img]:text-center prose-img:inline-block',
        'prose-inline-code:before:content-none prose-inline-code:after:content-none',
        'prose-inline-code:rounded-md prose-inline-code:border prose-inline-code:border-border',
        'prose-inline-code:bg-muted prose-inline-code:px-1.5 prose-inline-code:py-0.5',
        'prose-inline-code:font-semibold prose-inline-code:text-foreground prose-inline-code:font-mono',
        '[&_.footnotes]:border-border [&_.footnotes]:mt-12 [&_.footnotes]:border-t [&_.footnotes]:pt-6',
        '[&_.footnotes]:text-muted-foreground [&_.footnotes]:text-sm',
        '[&_.footnotes_li]:my-1 [&_.footnotes_ol]:my-0 [&_.footnotes_p]:my-0',
        '[&_.footnotes_a[data-footnote-backref]]:ml-1 [&_.footnotes_a[data-footnote-backref]]:text-xs',
        '[&_.footnotes_a[data-footnote-backref]]:opacity-50 [&_.footnotes_a[data-footnote-backref]:hover]:opacity-100',
      )}
    >
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  )
}

export default PostContent
