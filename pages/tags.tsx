import { MetaHeader, PostsList, TagsCloud } from '@components';
import { Layout } from '@layouts';
import {
  getBuildTime,
  getPostsMeta,
  getSiteConfig,
  getTagsData,
} from '@lib';
import type { PostMetaType, SiteConfig, TagsType } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMeta: PostMetaType[];
  tagsData: TagsType;
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const postsMeta = await getPostsMeta();
  const tagsData = await getTagsData();
  const siteConfig = getSiteConfig();
  return {
    props: {
      buildTime,
      postsMeta,
      tagsData,
      siteConfig,
    },
  };
};

const Tags = ({
  buildTime,
  postsMeta,
  tagsData,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteConfig;

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
        <TagsCloud tags={tagsData} />
        <PostsList posts={postsMeta} />
      </Layout>
    </div>
  );
};

export default Tags;
