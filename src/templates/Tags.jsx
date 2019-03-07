import React from 'react';
import { Layout } from '../layouts';
import { TagsCloud } from '../components';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts, tags } }) =>
  tags ? (
    <Layout banner="Tags">
      <TagsCloud tags={tags} />
    </Layout>
  ) : (
    <Layout banner="Tags">
      <GridPostPreviews posts={posts} />
    </Layout>
  );
