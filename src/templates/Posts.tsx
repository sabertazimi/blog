import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '@layouts';
import { PostsGrid } from '@components';

const Posts: React.FC<PageProps> = () => {
  return (
    <Layout banner="Posts">
      <PostsGrid />
    </Layout>
  );
};

export default Posts;
