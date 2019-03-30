import React from 'react';
import { PostLayout } from 'layouts';
import { Article } from 'components';

export default ({ pageContext: { post } }) => (
  <PostLayout>
    <Article post={post} />
  </PostLayout>
);
