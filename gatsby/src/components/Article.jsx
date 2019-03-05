import React  from 'react';
import { Segment, Container, Icon } from 'semantic-ui-react';

import ArticleDivider from './ArticleDivider';
import ArticleHeader from './ArticleHeader';
import ReactMarkdown from './ReactMarkdown';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';
import ScrollToTopButton from './ScrollToTopButton';
import { PRIMARY_COLOR } from '../constants';

import './Article.css';

const Article = ({ post }) => {
  const getRandomColor = () => {
    const colors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey'
    ];
    const colorIdx = Math.floor(Math.random() * 11);
    return colors[colorIdx];
  };

  const headerColor = getRandomColor();

  return (
    <Segment style={{ padding: '0em 0em' }} vertical>
      <ArticleHeader color={headerColor} post={post} />
      <Container text>
        <ReactMarkdown value={post.__content} />
        <ArticleDivider>{post.subtitle || 'Blog'}</ArticleDivider>
        <ArticleFooter post={post} />
        <ArticleDivider>
          <Icon color={PRIMARY_COLOR} name="comments outline" />
        </ArticleDivider>
        <ArticleComments />
      </Container>
      <ScrollToTopButton />
    </Segment>
  );
};

export default Article;
