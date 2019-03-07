import React from 'react';
import { useDisqus } from '../../hooks';

const ArticleComments = () => {
    useDisqus('https://http-blog-hust-cf.disqus.com');

    return (
      <div id='disqus_thread' />
    );
};

export default ArticleComments;
