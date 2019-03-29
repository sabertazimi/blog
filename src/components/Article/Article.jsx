import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Container, Icon } from 'semantic-ui-react';
import ArticleDivider from './ArticleDivider';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleComments from './ArticleComments';
import SocialGroup from '../SocialGroup';
import { randomColor } from '../../utils';
import { PRIMARY_COLOR } from '../../constants';

import './Article.css';

const Article = ({ post }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 1000,
  });

  return (
    <div style={{ marginTop: '-3em' }}>
      <ArticleHeader color={randomColor()} post={post} />
      <Container style={{ padding: '1em' }}>
        <animated.div
          style={props}
          dangerouslySetInnerHTML={{ __html: post.toc }}
        />
        <animated.div
          style={props}
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="markdown-body"
        />
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
