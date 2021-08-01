import React from 'react';
import Container from '@components/Container';
import SocialGroup from '@components/SocialGroup';
import { Comment } from '@components/Icons';
import ArticleHeader from './ArticleHeader';
import ArticleNav from './ArticleNav';
import ArticleContent from './ArticleContent';
import ArticleDivider from './ArticleDivider';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';

const Article = ({ post }) => {
  const { excerpt, toc, html, ...postMetadata } = post;

  return (
    <div>
      <ArticleHeader post={postMetadata} />
      <Container className="max-w-screen-lg px-6">
        <ArticleNav toc={toc} />
        <ArticleContent content={html} />
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
