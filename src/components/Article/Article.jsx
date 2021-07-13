import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleContent from './ArticleContent';
import ArticleNavigation from './ArticleNavigation';
import ArticleDivider from './ArticleDivider';
import ArticleComments from './ArticleComments';
import { Colors } from '@/config';
import { Container, Icons, SocialGroup } from '@/components';

const Article = ({ post }) => {
  const { excerpt, toc, html, ...postMetadata } = post;

  return (
    <div>
      <ArticleHeader post={postMetadata} />
      <Container>
        <ArticleNavigation toc={toc} />
        <ArticleContent content={html} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleFooter post={post} />
        <ArticleDivider>
          <Icons.Comment style={{ color: Colors.primary }} />
        </ArticleDivider>
        <ArticleComments />
        <SocialGroup />
      </Container>
    </div>
  );
};

export default Article;
