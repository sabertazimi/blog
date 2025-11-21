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
    <div className="container mx-auto px-6 lg:px-0">
      <div className="relative mb-8 h-64 w-full overflow-hidden md:h-96 lg:h-128">
        <PostThumbnailImage src={thumbnail} alt={title} enableHoverScale={false} />
      </div>
      <article>
        <MDXRemote {...source} components={mdxComponents} />
      </article>
    </div>
  )
}

export default PostContent
