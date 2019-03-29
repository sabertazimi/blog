import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleContent from './ArticleContent';
import ArticleNavigation from './ArticleNavigation';
import ArticleDivider from './ArticleDivider';
import ArticleComments from './ArticleComments';
import SocialGroup from '../SocialGroup';
import { randomColor } from '../../utils';
import { PRIMARY_COLOR } from '../../constants';

const Article = ({ post }) => {
  return (
    <div>
      <ArticleHeader color={randomColor()} post={post} />
      <Container style={{ padding: '1em' }}>
        <ArticleNavigation toc={post.toc} />
        <ArticleContent content={post.html} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleFooter post={post} />
        <ArticleDivider>
          <Icon color={PRIMARY_COLOR} name="comments outline" />
        </ArticleDivider>
        <ArticleComments />
        <SocialGroup />
      </Container>
    </div>
  );
};

export default Article;
