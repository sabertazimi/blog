import { BooksGrid } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getPostsMeta } from '@lib';
import type { PostMeta } from '@types';
import type { GetStaticProps } from 'next/types';

interface Props {
  buildTime: string | number | Date;
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

const Books = ({ buildTime, postsMeta }: Props): JSX.Element => (
  <Layout banner="Books" buildTime={buildTime} posts={postsMeta}>
    <BooksGrid />
  </Layout>
);

export default Books;
