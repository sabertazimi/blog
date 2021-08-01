import React from 'react';
import { useSpring, animated } from 'react-spring';
import * as styles from './ArticleContent.module.css';

const ArticleContent = ({ content }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 1000,
  });

  return (
    <animated.div
      className={styles.markdownBody}
      style={props}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleContent;
