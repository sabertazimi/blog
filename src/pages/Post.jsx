import React, { Component } from 'react';

import {
  Footer,
  ReactArticle,
  withDataFetcher
} from '../components';

import {
  Header,
} from '../containers';

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
