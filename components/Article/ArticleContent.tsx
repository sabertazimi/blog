import { MDXRemote } from '@alisowski/next-mdx-remote';
import MDX from '@components/MDX';
import type { Post } from '@types';

interface Props {
  source: Post['source'];
}

const ArticleContent = ({ source }: Props): JSX.Element => (
  <article>
    <MDXRemote {...source} components={MDX} />
  </article>
);

export default ArticleContent;
