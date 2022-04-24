import { Container, Footer, Header } from '@components';
import type { PostMetaType, SiteMetadata } from '@types';
import { Divider } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  banner: string;
  posts: PostMetaType[];
  buildTime: string | number | Date;
  author: SiteMetadata['author'];
  socialList: SiteMetadata['socialList'];
  children: ReactNode;
}

const Layout = ({
  banner,
  posts,
  buildTime,
  author,
  socialList,
  children,
}: Props): JSX.Element => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-200px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <div>
      <Header posts={posts} />
      <Container className="min-h-screen px-0 pb-28 pt-0 md:pt-28">
        <animated.div style={props}>
          <Divider className="mx-0 my-12 font-extrabold">
            {banner || 'Life'}
          </Divider>
          {children}
        </animated.div>
      </Container>
      <Footer buildTime={buildTime} author={author} socialList={socialList} />
    </div>
  );
};

export default Layout;
