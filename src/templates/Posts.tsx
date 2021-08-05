import React from 'react';
import { usePostsMetadata } from '@hooks';
import { Layout } from '@layouts';
import { PostsGrid } from '@components';

const Posts = (): JSX.Element => {
  const { posts } = usePostsMetadata();

  return (
    <Layout banner="Posts">
      <PostsGrid posts={posts} />
    </Layout>
  );
};

export default Posts;
