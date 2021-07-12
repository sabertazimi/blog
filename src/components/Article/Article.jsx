import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleContent from './ArticleContent';
import ArticleNavigation from './ArticleNavigation';
import ArticleDivider from './ArticleDivider';
import ArticleComments from './ArticleComments';
import { Container, Icons, SocialGroup } from '@/components';
import { Colors } from '@/config';

const Article = ({ post }) => {
  return (
    <div>
      <ArticleHeader post={post} />
      <Container>
        <ArticleNavigation toc={post.toc} />
        <ArticleContent content={post.html} />
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
