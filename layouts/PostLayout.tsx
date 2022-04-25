import { Container, Footer, Header, MetaHeader } from '@components';
import type { PostMeta } from '@types';
import { BackTop } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMeta[];
  buildTime: string | number | Date;
  children: ReactNode;
}

const PostLayout = ({ banner, posts, buildTime, children }: Props): JSX.Element => (
  <div>
    <MetaHeader title={`${banner}`}/>
    <Header posts={posts} />
    <Container className="max-w-full">
      {children}
      <BackTop />
    </Container>
    <Footer buildTime={buildTime} />
  </div>
);

export default PostLayout;
