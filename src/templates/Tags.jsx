import React from 'react';
import { Layout, PostLayout } from '../layouts';
import { TagsCloud } from '../components';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts, tags } }) =>
  tags ? (
    <Layout banner="Tags">
      <TagsCloud tags={tags} />
    </Layout>
  ) : (
    <PostLayout>
      <GridPostPreviews posts={posts} />
    </PostLayout>
  );
