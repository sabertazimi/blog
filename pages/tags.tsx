import { MetaHeader, PostsList, TagsCloud } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getPostsMetadata,
  getSiteMetadata,
  getTagsData,
} from '@lib';
import type { PostMetaType, SiteMetadata, TagsType } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMetadata: PostMetaType[];
  tagsData: TagsType;
  siteMetadata: SiteMetadata;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const postsMetadata = await getPostsMetadata();
  const tagsData = await getTagsData();
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      buildTime,
      postsMetadata,
      tagsData,
      siteMetadata,
    },
  };
};

const Tags = ({
  buildTime,
  postsMetadata,
  tagsData,
  siteMetadata,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteMetadata;

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
        <TagsCloud tags={tagsData} />
        <PostsList posts={postsMetadata} />
      </Layout>
    </div>
  );
};

export default Tags;
