import { MetaHeader, PostsGrid } from '@components';
import { usePostsMetadata, useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import React from 'react';

const Posts = (): JSX.Element => {
  const { siteUrl, title } = useSiteMetadata();
  const { posts } = usePostsMetadata();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout banner="Posts">
        <PostsGrid posts={posts} />
      </Layout>
    </div>
  );
};

export default Posts;
