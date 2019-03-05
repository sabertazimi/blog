import React from 'react';
import { SimpleLayout } from '../layouts';
import { Article } from '../components';

export default ({ pageContext: { post }}) => (
  <SimpleLayout>
    <Article post={post} />
  </SimpleLayout>
);
