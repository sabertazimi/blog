import { MetaHeader, PostsGrid } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getPostsMeta, getSiteConfig } from '@lib';
import type { PostMetaType, SiteConfig } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMeta: PostMetaType[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const postsMeta = await getPostsMeta();
  const siteConfig = getSiteConfig();
  return {
    props: {
      buildTime,
      postsMeta,
      siteConfig,
    },
  };
};

const Posts = ({
  buildTime,
  postsMeta,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteConfig;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Posts"
        buildTime={buildTime}
        posts={postsMeta}
        author={author}
        socialList={socialList}
      >
        <PostsGrid posts={postsMeta} />
      </Layout>
    </div>
  );
};

export default Posts;
