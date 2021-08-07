import { PostsGrid } from '@components';
import { usePostsMetadata } from '@hooks';
import { Layout } from '@layouts';
import React from 'react';

const Posts = (): JSX.Element => {
  const { posts } = usePostsMetadata();

  return (
    <Layout banner="Posts">
      <PostsGrid posts={posts} />
    </Layout>
  );
};

export default Posts;
