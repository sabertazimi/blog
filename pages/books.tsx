import { BooksGrid, MetaHeader } from '@components';
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

const Books = ({
  buildTime,
  postsMeta,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, bookList, socialList } = siteConfig;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Books"
        buildTime={buildTime}
        posts={postsMeta}
        author={author}
        socialList={socialList}
      >
        <BooksGrid bookList={bookList} />
      </Layout>
    </div>
  );
};

export default Books;
