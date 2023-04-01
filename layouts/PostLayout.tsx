import { BackTop, Container, Footer, Header, MetaHeader } from '@components';
import type { BuildTime, PostMeta } from '@types';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMeta[];
  buildTime: BuildTime;
  children: ReactNode;
}

const PostLayout = ({
  banner,
  posts,
  buildTime,
  children,
}: Props): JSX.Element => (
  <div className="dark:bg-black">
    <MetaHeader title={`${banner}`} />
    <Header posts={posts} />
    <Container className="max-w-full">
      {children}
      <BackTop className="bottom-12 right-12 md:bottom-16 md:right-16" />
    </Container>
    <Footer buildTime={buildTime} />
  </div>
);

export default PostLayout;
