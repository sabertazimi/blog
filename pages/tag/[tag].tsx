import { MetaHeader, PostsList, TagsCloud } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getPostsMeta,
  getSiteConfig,
  getTagsData,
} from '@lib';
import type { PostMetaType, SiteConfig, TagsType, TagType } from '@types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMeta: PostMetaType[];
  tagsData: TagsType;
  activeTag: TagType;
  siteConfig: SiteConfig;
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
  const siteConfig = getSiteConfig();
  return {
    props: {
      buildTime,
      postsMeta,
      tagsData,
      activeTag,
      siteConfig,
    },
  };
};

const Tags = ({
  buildTime,
  postsMeta,
  tagsData,
  activeTag,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteConfig;
  const postsMetaByTag = postsMeta.filter(
    ({ tags }) => tags && tags.includes(activeTag)
  );

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Tags"
        buildTime={buildTime}
        posts={postsMeta}
        author={author}
        socialList={socialList}
      >
        <TagsCloud tags={tagsData} activeTag={activeTag} />
        <PostsList posts={postsMetaByTag} />
      </Layout>
    </div>
  );
};

export default Tags;
