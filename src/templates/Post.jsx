import React from 'react';
import { PostLayout } from '@/layouts';
import { Article } from '@/components';

const Post = ({ pageContext: { post } }) => (
  <PostLayout>
    <Article post={post} />
  </PostLayout>
);

export default Post;
