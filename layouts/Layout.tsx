import { Container, Divider, Footer, Header, MetaHeader } from '@components';
import { Slide } from '@components/Motion';
import type { PostMeta } from '@types';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMeta[];
  buildTime: string | number | Date;
  children: ReactNode;
}

const Layout = ({ banner, posts, buildTime, children }: Props): JSX.Element => (
  <div>
    <MetaHeader title={`${banner}`} />
    <Header posts={posts} />
    <Container className="min-h-screen px-0 pb-28 pt-0 md:pt-28">
      <Slide>
        <Divider>{banner}</Divider>
        {children}
      </Slide>
    </Container>
    <Footer buildTime={buildTime} />
  </div>
);

export default Layout;
