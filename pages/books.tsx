import { BooksGrid, MetaHeader } from '@components';
import { Layout } from '@layouts';
import { getBuildTime, getPostsMetadata, getSiteMetadata } from '@lib';
import type { PostMetaType, SiteMetadata } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  buildTime: string | number | Date;
  postsMetadata: PostMetaType[];
  siteMetadata: SiteMetadata;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buildTime = getBuildTime();
  const postsMetadata = await getPostsMetadata();
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      buildTime,
      postsMetadata,
      siteMetadata,
    },
  };
};

const Books = ({
  buildTime,
  postsMetadata,
  siteMetadata,
}: Props): JSX.Element => {
  const { siteUrl, title, author, bookList, socialList } = siteMetadata;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Books"
        buildTime={buildTime}
        posts={postsMetadata}
        author={author}
        socialList={socialList}
      >
        <BooksGrid bookList={bookList} />
      </Layout>
    </div>
  );
};

export default Books;
