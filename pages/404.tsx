import { Layout } from '@layouts';
import { getBuildTime, getPostsMeta } from '@lib';
import type { PostMeta } from '@types';
import { Result } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
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

const NotFound = ({ buildTime, postsMeta }: Props): JSX.Element => (
  <div>
    <Layout banner="Exploring" buildTime={buildTime} posts={postsMeta}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/posts">
            <a
              className={classNames(
                'block m-auto mt-12 py-3 px-6 max-w-fit',
                'rounded-full',
                'font-extrabold text-2xl',
                'text-light bg-gradient-primary'
              )}
            >
              Back Home
            </a>
          </Link>
        }
      />
    </Layout>
  </div>
);

export default NotFound;
