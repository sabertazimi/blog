import React, { ReactNode } from 'react';
import { BackTop } from 'antd';
import { Container } from '@components';
import { Header, Footer } from '@containers';

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
