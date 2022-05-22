import { BackTop, Container, Footer, Header, MetaHeader } from '@components';
import type { PostMeta } from '@types';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMeta[];
  buildTime: string | number | Date;
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
      <BackTop className="right-12 bottom-12 md:right-16 md:bottom-16" />
    </Container>
    <Footer buildTime={buildTime} />
  </div>
);

export default PostLayout;
