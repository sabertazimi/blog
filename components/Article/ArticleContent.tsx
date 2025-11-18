'use client'

import type { PostType } from '@/types'
import { MDXRemote } from 'next-mdx-remote'
import MDX from '@/components/MDX'

interface Props {
  source: PostType['source']
}

function ArticleContent({ source }: Props) {
  return (
    <article>
      <MDXRemote {...source} components={MDX} />
    </article>
  )
}

export default ArticleContent
