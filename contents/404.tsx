import { MetaHeader } from '@components';
import { Layout } from '@layouts';
import type { PostMetaType, SiteConfig } from '@types';
import React from 'react';

interface Props {
  posts: PostMetaType[];
  buildTime: string | number | Date;
  siteConfig: SiteConfig;
}

const NotFoundPage = ({
  posts,
  buildTime,
  siteConfig,
}: Props): JSX.Element => {
  const { siteUrl, title, author, socialList } = siteConfig;

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout
        banner="Exploring"
        posts={posts}
        buildTime={buildTime}
        author={author}
        socialList={socialList}
      >
        <div className="text-center">
          <h1>Sorry, the page you visited does not exist.</h1>
        </div>
      </Layout>
    </div>
  );
};

export default NotFoundPage;
