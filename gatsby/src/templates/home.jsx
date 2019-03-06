import React from 'react';
import { Helmet } from 'react-helmet';
import { SimpleLayout } from '../layouts';
import { GridPostPreviews } from '../components';

export default ({ pageContext: { posts } }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sabertazimi's Blog</title>
      <link rel="canonical" href="http://sabertazimi.github.io" />
    </Helmet>
    <SimpleLayout>
      <GridPostPreviews posts={posts} />
    </SimpleLayout>
  </div>
);
