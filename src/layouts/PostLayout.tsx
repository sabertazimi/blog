import React from 'react';
import { BackTop } from 'antd';
import { Header, Footer, Container } from '@components';

const PostLayout = ({ children }) => (
  <div>
    <Header />
    <Container className="max-w-full">
      {children}
      <BackTop />
    </Container>
    <Footer />
  </div>
);

export default PostLayout;
