import { Container, Footer, Header, MetaHeader } from '@components';
import { SlideRight } from '@components/Motion';
import type { PostMeta } from '@types';
import { Divider } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMeta[];
  buildTime: string | number | Date;
  children: ReactNode;
}

const Layout = ({ banner, posts, buildTime, children }: Props): JSX.Element => (
  <div>
    <MetaHeader />
    <Header posts={posts} />
    <Container className="min-h-screen px-0 pb-28 pt-0 md:pt-28">
      <SlideRight>
        <Divider className="mx-0 my-12 font-extrabold">
          {banner || 'Life'}
        </Divider>
        {children}
      </SlideRight>
    </Container>
    <Footer buildTime={buildTime} />
  </div>
);

export default Layout;
