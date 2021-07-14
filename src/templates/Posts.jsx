import React from 'react';
import { Layout } from '@layouts';
import { PostsGrid } from '@components';

const Posts = () => {
  return (
    <Layout banner="Posts">
      <PostsGrid />
    </Layout>
  );
};

export default Posts;
