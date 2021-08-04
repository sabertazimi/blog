import React from 'react';
import { PostType } from '@types';
import Container from '@components/Container';
import SocialGroup from '@components/SocialGroup';
import { Comment } from '@components/Icons';
import ArticleHeader from './ArticleHeader';
import ArticleNav from './ArticleNav';
import ArticleContent from './ArticleContent';
import ArticleDivider from './ArticleDivider';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';

interface Props {
  post: PostType;
}

const Article = ({ post }: Props): JSX.Element => {
  const {
    slug,
    title,
    subtitle,
    author,
    date,
    tags,
    timeToRead,
    prevPost,
    nextPost,
    toc,
    html,
  } = post;

  const postMetadata = {
    slug,
    title,
    subtitle,
    author,
    date,
    tags,
    timeToRead,
    prevPost,
    nextPost,
  };

  return (
    <div>
      <ArticleHeader post={postMetadata} />
      <Container className="max-w-screen-lg px-6">
        <ArticleNav toc={toc as string} />
        <ArticleContent content={html as string} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleFooter post={postMetadata} />
        <ArticleDivider>
          <Comment className="text-2xl text-primary" />
        </ArticleDivider>
        <ArticleComments />
        <SocialGroup />
      </Container>
    </div>
  );
};

export default Article;
