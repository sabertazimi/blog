import { PostsList, TagsCloud } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getPostsMeta, getTagsData } from '@lib';
import type { PostMeta, Tag, Tags } from '@types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { ParsedUrlQuery } from 'node:querystring';

interface Props {
  buildTime: string | number | Date;
  postsMeta: PostMeta[];
  tagsData: Tags;
  activeTag: Tag;
}

interface QueryParams extends ParsedUrlQuery {
  tag: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const tagsData = await getTagsData();
  const paths = Object.keys(tagsData).map(tag => ({
    params: {
      tag,
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
  const buildTime = getBuildTime();
  const postsMeta = await getPostsMeta();
  const tagsData = await getTagsData();
  const activeTag = (params as QueryParams).tag;

  return {
    props: {
      buildTime,
      postsMeta,
      tagsData,
      activeTag,
    },
  };
};

const Tags = ({
  buildTime,
  postsMeta,
  tagsData,
  activeTag,
}: Props): JSX.Element => {
  const postsMetaByTag = postsMeta.filter(
    ({ tags }) => tags && tags.includes(activeTag)
  );

  return (
    <Layout banner="Tags" buildTime={buildTime} posts={postsMeta}>
      <TagsCloud tags={tagsData} activeTag={activeTag} />
      <PostsList posts={postsMetaByTag} />
    </Layout>
  );
};

export default Tags;
