import MDXComponents from '@components/MDX';
import { Ease } from '@components/Motion';
import type { Post } from '@types';
import { MDXRemote } from 'next-mdx-remote';
interface Props {
  source: Post['source'];
}

const ArticleContent = ({ source }: Props): JSX.Element => {
  return (
    <Ease>
      <MDXRemote {...source} components={MDXComponents} />
    </Ease>
  );
};

export default ArticleContent;
