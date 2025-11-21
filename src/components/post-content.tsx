'use client'

import type { Post } from '@/types'
import { MDXRemote } from 'next-mdx-remote'
import mdxComponents from '@/components/mdx'
import PostThumbnailImage from '@/components/post-thumbnail-image'

interface PostContentProps {
  post: Post
}

function PostContent({ post: { excerpt: _, source, thumbnail, title } }: PostContentProps) {
  return (
    <div className="border-border container mx-auto flex border-x px-6 lg:px-0">
      <article className="border-border border-r">
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <PostThumbnailImage src={thumbnail} alt={title} enableHoverScale={false} />
        </div>
        <div className="p-6 lg:p-10">
          <MDXRemote {...source} components={mdxComponents} />
        </div>
      </article>
      <aside className="bg-muted/60 dark:bg-muted/20 hidden w-96 shrink-0 p-6 lg:block lg:p-10"></aside>
    </div>
  )
}

export default PostContent
