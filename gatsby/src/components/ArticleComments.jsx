import React, { Component } from 'react';

class ArticleComments extends Component {
  loadDisqus = () => {
    const script = document.createElement('script');
    script.src = 'https://http-blog-hust-cf.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());

    if (document.getElementById('disqus_thread')) {
      (document.body || document.head).appendChild(script);
    }
  };

  componentDidMount() {
    this.loadDisqus();
  }

  componentDidUpdate() {
    this.loadDisqus();
  }

  render() {
    return (
      <div id='disqus_thread' />
    );
  }
};

export default ArticleComments;
