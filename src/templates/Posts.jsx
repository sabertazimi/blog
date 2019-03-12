import React from 'react';
import { PostLayout } from '../layouts';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts } }) => (
  <PostLayout>
    <GridPostPreviews posts={posts} />
  </PostLayout>
);
