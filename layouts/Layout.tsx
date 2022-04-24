import { Container, Footer, Header } from '@components';
import { SlideRight } from '@components/Motion';
import type { PostMetaType, SiteConfig } from '@types';
import { Divider } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  banner: string;
  posts: PostMetaType[];
  buildTime: string | number | Date;
  author: SiteConfig['author'];
  socialList: SiteConfig['socialList'];
  children: ReactNode;
}

const Layout = ({
  banner,
  posts,
  buildTime,
  author,
  socialList,
  children,
}: Props): JSX.Element => (
  <div>
    <Header posts={posts} />
    <Container className="min-h-screen px-0 pb-28 pt-0 md:pt-28">
      <SlideRight>
        <Divider className="mx-0 my-12 font-extrabold">
          {banner || 'Life'}
        </Divider>
        {children}
      </SlideRight>
    </Container>
    <Footer buildTime={buildTime} author={author} socialList={socialList} />
  </div>
);

export default Layout;
