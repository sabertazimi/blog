import { Layout } from '@layouts';
import React from 'react';

const NotFoundPage = (): JSX.Element => {
  return (
    <Layout banner="Exploring">
      <div className="text-center">
        <h1>Sorry, the page you visited does not exist.</h1>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
