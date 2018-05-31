import React, { Component } from 'react';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import ReactArticle from '../components/ReactArticle.js';
import withDataFetcher from '../components/withDataFetcher.js';

class Post extends Component {
  render() {
    const ReactArticleComp = withDataFetcher(`/_posts/json/${this.props.match.params.mdFile}.json`)(ReactArticle);

    return (
      <div>
        <Header headingHidden={true} />
        <ReactArticleComp history={ this.props.history } />
        <Footer />
      </div>
    )
  }
}

export default Post;
