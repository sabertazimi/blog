'use client'

import type { PostType } from '@/types'
import MDX from '@/components/MDX'
import { MDXRemote } from 'next-mdx-remote'

interface Props {
  source: PostType['source']
}

function ArticleContent({ source }: Props): JSX.Element {
  return (
    <article>
      <MDXRemote {...source} components={MDX} />
    </article>
  )
}

export default ArticleContent
