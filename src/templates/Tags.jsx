import React from 'react';
import { Layout } from '../layouts';
import { TagsCloud } from '../components';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { tags, activeTag, posts } }) => (
  <React.Fragment>
    <Layout banner="Tags">
      <TagsCloud tags={tags} activeTag={activeTag} />
      {posts ? <GridPostPreviews posts={posts} /> : null}
    </Layout>
  </React.Fragment>
);
