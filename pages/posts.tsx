import { PostsGrid } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getPostsMeta } from '@lib';
import type { BuildTime, PostMeta } from '@types';
import type { GetStaticProps } from 'next/types';

interface Props {
  buildTime: BuildTime;
  postsMeta: PostMeta[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const postsMeta = await getPostsMeta();

  return {
    props: {
      buildTime,
      postsMeta,
    },
  };
};

const Posts = ({ buildTime, postsMeta }: Props): JSX.Element => (
  <Layout banner="Posts" buildTime={buildTime} posts={postsMeta}>
    <PostsGrid posts={postsMeta} />
  </Layout>
);

export default Posts;
