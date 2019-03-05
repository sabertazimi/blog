import React from 'react';
import { SimpleLayout } from '../layouts';
import { TagsCloud } from '../components';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts, tags } }) =>
  tags ? (
    <SimpleLayout>
      <TagsCloud data={tags} />
    </SimpleLayout>
  ) : (
    <SimpleLayout>
      <GridPostPreviews data={posts} />
    </SimpleLayout>
  );
