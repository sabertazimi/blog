import { MDXRemote } from '@alisowski/next-mdx-remote'
import MDX from '@components/MDX'
import type { PostType } from '@types'

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
