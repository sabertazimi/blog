import MDX from '@components/MDX';
import { Ease } from '@components/Motion';
import type { Post } from '@types';
import { MDXRemote } from 'next-mdx-remote';

interface Props {
  source: Post['source'];
}

const ArticleContent = ({ source }: Props): JSX.Element => (
  <Ease>
    <MDXRemote {...source} components={MDX} />
  </Ease>
);

export default ArticleContent;
