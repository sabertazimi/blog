import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Container, Icon } from 'semantic-ui-react';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleNavigation from './ArticleNavigation';
import ArticleDivider from './ArticleDivider';
import ArticleComments from './ArticleComments';
import SocialGroup from '../SocialGroup';
import { randomColor } from '../../utils';
import { PRIMARY_COLOR } from '../../constants';
import styles from './Article.module.css';

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
        <ArticleNavigation toc={post.toc} />
        <animated.div
          style={props}
          dangerouslySetInnerHTML={{ __html: post.html }}
          className={styles.markdownBody}
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
