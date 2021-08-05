import React, { ReactNode } from 'react';
import { BackTop } from 'antd';
import { Header, Footer, Container } from '@components';

interface Props {
  children: ReactNode;
}

const PostLayout = ({ children }: Props): JSX.Element => (
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
