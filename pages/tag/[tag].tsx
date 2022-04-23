import { MetaHeader, PostsList, TagsCloud } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getPostsMetadata,
  getSiteMetadata,
  getTagsData,
} from '@lib';
import type { PostMetaType, SiteMetadata, TagsType, TagType } from '@types';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMetadata: PostMetaType[];
  tagsData: TagsType;
  activeTag: TagType;
  siteMetadata: SiteMetadata;
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
  const postsMetadata = await getPostsMetadata();
  const tagsData = await getTagsData();
  const activeTag = (params as QueryParams).tag;
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      buildTime,
      postsMetadata,
      tagsData,
      activeTag,
      siteMetadata,
    },
  };
};

const Tags = ({
  buildTime,
  postsMetadata,
  tagsData,
  activeTag,
  siteMetadata,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteMetadata;
  const postsMetadataByTag = postsMetadata.filter(
    ({ tags }) => tags && tags.includes(activeTag)
  );

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Tags"
        buildTime={buildTime}
        posts={postsMetadata}
        author={author}
        socialList={socialList}
      >
        <TagsCloud tags={tagsData} activeTag={activeTag} />
        <PostsList posts={postsMetadataByTag} />
      </Layout>
    </div>
  );
};

export default Tags;
