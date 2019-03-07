import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Container, Icon } from 'semantic-ui-react';
import ArticleDivider from './ArticleDivider';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';
import ScrollToTopButton from '../ScrollButton';
import { randomColor } from '../../utils';
import { PRIMARY_COLOR } from '../../constants';

import './Article.css';

const Article = ({ post }) => (
  <div>
    <ArticleHeader color={randomColor()} post={post} />
    <Spring
      from={{ opacity: 0, transform: 'translateY(-200px)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {props => (
        <Container
          style={{ ...props, maxWidth: 960, padding: '1em' }}
          className="slideIn"
        >
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="markdown-body"
          />
          <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
          <ArticleFooter post={post} />
          <ArticleDivider>
            <Icon color={PRIMARY_COLOR} name="comments outline" />
          </ArticleDivider>
          <ArticleComments />
        </Container>
      )}
    </Spring>
    <ScrollToTopButton />
  </div>
);

export default Article;
