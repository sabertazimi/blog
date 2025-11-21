'use client'

import type { Post } from '@/types'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from '@/components/mdx'

interface PostContentProps {
  post: Post
}

function PostContent({
  post: { excerpt: _, source },
}: PostContentProps) {
  return (
    <div className="container mx-auto px-6 lg:px-0">
      <article>
        <MDXRemote {...source} components={mdxComponents} />
      </article>
    </div>
  )
}

export default PostContent
