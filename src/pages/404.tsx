import React from 'react';
import { Layout } from '@layouts';

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
