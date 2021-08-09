import { MetaHeader } from '@components';
import { useSiteMetadata } from '@hooks';
import { Layout } from '@layouts';
import React from 'react';

const NotFoundPage = (): JSX.Element => {
  const { siteUrl, title } = useSiteMetadata();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <Layout banner="Exploring">
        <div className="text-center">
          <h1>Sorry, the page you visited does not exist.</h1>
        </div>
      </Layout>
    </div>
  );
};

export default NotFoundPage;
