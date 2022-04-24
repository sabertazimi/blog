import { Container, Footer, Header } from '@components';
import type { PostMetaType, SiteMetadata } from '@types';
import { BackTop } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  posts: PostMetaType[];
  buildTime: string | number | Date;
  author: SiteMetadata['author'];
  socialList: SiteMetadata['socialList'];
  children: ReactNode;
}

const PostLayout = ({
  posts,
  buildTime,
  author,
  socialList,
  children,
}: Props): JSX.Element => (
  <div>
    <Header posts={posts} />
    <Container className="max-w-full">
      {children}
      <BackTop />
    </Container>
    <Footer buildTime={buildTime} author={author} socialList={socialList} />
  </div>
);

export default PostLayout;