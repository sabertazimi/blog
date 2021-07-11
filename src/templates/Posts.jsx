import React from 'react';
import { PostLayout } from 'layouts';
import { GridPostPreviews } from 'components';

const Posts = ({ pageContext: { posts } }) => (
  <PostLayout posts={posts}>
    <GridPostPreviews posts={posts} />
  </PostLayout>
);

export default Posts;
