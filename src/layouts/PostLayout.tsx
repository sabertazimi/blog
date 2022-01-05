import { Container } from '@components';
import { Footer, Header } from '@containers';
import { BackTop } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';

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
