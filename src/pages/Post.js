import React, { Component } from 'react';

import {
  Header,
  Footer,
  ReactArticle,
  withDataFetcher
} from '../components';

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
