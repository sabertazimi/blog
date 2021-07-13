import React from 'react';
import { BackTop } from 'antd';
import { Header, Footer } from '@/components';

const PostLayout = ({ children }) => (
  <div>
    <Header />
    <div style={{ width: '100%', padding: '0 0 3em 0', overflow: 'hidden' }}>
      {children}
      <BackTop />
    </div>
    <Footer />
  </div>
);

export default PostLayout;
