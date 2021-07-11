import React from 'react';
import { Result } from 'antd';
import { Layout } from 'layouts';

const NotFoundPage = () => (
  <Layout banner="Exploring">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  </Layout>
);

export default NotFoundPage;
