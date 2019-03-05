import React from 'react';
import { SimpleLayout } from '../layouts';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts }}) => (
  <SimpleLayout>
    <GridPostPreviews data={posts} />
  </SimpleLayout>
);
