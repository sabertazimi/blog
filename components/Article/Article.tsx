import Container from '@components/Container';
import { Comment } from '@components/Icons';
import SocialGroup from '@components/SocialGroup';
import { siteConfig } from '@config';
import type { Post } from '@types';
import ArticleComments from './ArticleComments';
import ArticleContent from './ArticleContent';
import ArticleDivider from './ArticleDivider';
import ArticleHeader from './ArticleHeader';
import ArticleNav from './ArticleNav';
import ArticleToc from './ArticleToc';

interface Props {
  post: Post;
  siteUrl?: string;
}

const Article = ({
  post,
  siteUrl = siteConfig.siteUrl,
}: Props): JSX.Element => {
  const {
    slug,
    title,
    subtitle,
    author,
    createTime,
    updateTime,
    tags,
    timeToRead,
    prevPost,
    nextPost,
    toc,
    source,
  } = post;

  const postMeta = {
    slug,
    title,
    subtitle,
    author,
    createTime,
    updateTime,
    tags,
    timeToRead,
    prevPost,
    nextPost,
  };

  const socialUrl = `${siteUrl}/post/${slug}`;

  return (
    <div>
      <ArticleHeader post={postMeta} />
      <Container className="max-w-screen-lg px-6">
        <ArticleToc toc={toc} />
        <ArticleContent source={source} />
        <ArticleDivider>{subtitle || 'Blog'}</ArticleDivider>
        <ArticleNav prevPost={prevPost} nextPost={nextPost} />
        <ArticleDivider>
          <Comment className="text-2xl text-primary" />
        </ArticleDivider>
        <ArticleComments />
        <SocialGroup url={socialUrl} />
      </Container>
    </div>
  );
};

export default Article;
