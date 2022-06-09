import Container from '@components/Container';
import Divider from '@components/Divider';
import { Comment } from '@components/Icons';
import SocialGroup from '@components/SocialGroup';
import { siteConfig } from '@config';
import type { Post, SiteConfig } from '@types';
import ArticleComments from './ArticleComments';
import ArticleContent from './ArticleContent';
import ArticleHeader from './ArticleHeader';
import ArticleNav from './ArticleNav';
import ArticleToc from './ArticleToc';

interface Props {
  post: Post;
  siteUrl?: SiteConfig['siteUrl'];
}

const Article = ({
  post: { excerpt, source, ...postMeta },
  siteUrl = siteConfig.siteUrl,
}: Props): JSX.Element => {
  const { slug, subtitle, prevPost, nextPost } = postMeta;
  const socialUrl = `${siteUrl}/post/${slug}`;

  return (
    <div>
      <ArticleHeader post={postMeta} />
      <ArticleToc slug={slug} />
      <Container className="max-w-screen-lg px-6 md:max-w-3xl">
        <ArticleContent source={source} />
        <Divider>{subtitle || 'Blog'}</Divider>
        <ArticleNav prevPost={prevPost} nextPost={nextPost} />
        <Divider>
          <Comment className="text-2xl text-primary" />
        </Divider>
        <ArticleComments />
        <SocialGroup url={socialUrl} />
      </Container>
    </div>
  );
};

export default Article;
