import { Article } from '@components';
import { siteConfig } from '@config';
import { PostLayout } from '@layouts';
import { getBuildTime, getPostData, getPostsMeta } from '@lib';
import type { Post, PostMeta } from '@types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  buildTime: string | number | Date;
  postData: Post;
  postsMeta: PostMeta[];
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const postsMeta = await getPostsMeta();
  const paths = postsMeta.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, QueryParams> = async ({
  params,
}) => {
  const slug = (params as QueryParams).slug;
  const buildTime = getBuildTime();
  const postData = (await getPostData(slug)) as Post;
  const postsMeta = await getPostsMeta();

  return {
    props: {
      buildTime,
      postData,
      postsMeta,
    },
  };
};

const Post = ({ buildTime, postData, postsMeta }: Props): JSX.Element => {
  const { siteUrl, disqusUrl } = siteConfig;
  const socialUrl = `${siteUrl}/post/${postData.slug}`;

  return (
    <PostLayout buildTime={buildTime} posts={postsMeta}>
      <Article post={postData} commentUrl={disqusUrl} socialUrl={socialUrl} />
    </PostLayout>
  );
};

export default Post;
