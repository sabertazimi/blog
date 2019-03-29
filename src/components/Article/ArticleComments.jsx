import React from 'react';
import { useDisqus } from '../../hooks';
import styles from './ArticleComments.module.css';

const ArticleComments = () => {
  useDisqus('https://http-blog-hust-cf.disqus.com');

  return <div id="disqus_thread" className={styles.disqus} />;
};

export default ArticleComments;
