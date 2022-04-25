import { SlideUp } from '@components/Motion';
import type { Post } from '@types';
import { MDXRemote } from 'next-mdx-remote';
interface Props {
  source: Post['source'];
}

const ArticleContent = ({ source }: Props): JSX.Element => {
  return (
    <SlideUp>
      <MDXRemote {...source} />
    </SlideUp>
  );
};

export default ArticleContent;
