import React from 'react';
import { Colors } from '@config';
import Container from '@components/Container';
import Icons from '@components/Icons';
import SocialGroup from '@components/SocialGroup';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleContent from './ArticleContent';
import ArticleNav from './ArticleNav';
import ArticleDivider from './ArticleDivider';
import ArticleComments from './ArticleComments';

const Article = ({ post }) => {
  const { excerpt, toc, html, ...postMetadata } = post;

  return (
    <div>
      <ArticleHeader post={postMetadata} />
      <Container className="max-w-screen-lg">
        <ArticleNav toc={toc} />
        <ArticleContent content={html} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleFooter post={postMetadata} />
        <ArticleDivider>
          <Icons.Comment
            className="text-2xl"
            style={{ color: Colors.primary }}
          />
        </ArticleDivider>
        <ArticleComments />
        <SocialGroup />
      </Container>
    </div>
  );
};

export default Article;
