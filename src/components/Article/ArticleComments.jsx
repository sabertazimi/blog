import React from 'react';
import { useDisqus, useSiteMetadata } from '@/hooks';
import * as styles from './ArticleComments.module.css';

const ArticleComments = () => {
  const { disqusUrl } = useSiteMetadata();
  useDisqus(disqusUrl);

  return <div id="disqus_thread" className={styles.disqus} />;
};

export default ArticleComments;
