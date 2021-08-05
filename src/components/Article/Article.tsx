import React from 'react';
import { PostType } from '@types';
import Container from '@components/Container';
import SocialGroup from '@components/SocialGroup';
import { Comment } from '@components/Icons';
import ArticleHeader from './ArticleHeader';
import ArticleToc from './ArticleToc';
import ArticleContent from './ArticleContent';
import ArticleDivider from './ArticleDivider';
import ArticleNav from './ArticleNav';
import ArticleComments from './ArticleComments';

interface Props {
  post: PostType;
  commentUrl: string;
  socialUrl: string;
}

const Article = ({ post, commentUrl, socialUrl }: Props): JSX.Element => {
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
        <ArticleToc toc={toc as string} />
        <ArticleContent content={html as string} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleNav post={postMetadata} />
        <ArticleDivider>
          <Comment className="text-2xl text-primary" />
        </ArticleDivider>
        <ArticleComments url={commentUrl} />
        <SocialGroup url={socialUrl} />
      </Container>
    </div>
  );
};

export default Article;
