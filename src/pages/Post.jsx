import React, { Component } from 'react';

import {
  Footer,
  Article,
  withDataFetcher
} from '../components';

import {
  Header,
} from '../containers';

class Post extends Component {
  render() {
    const ArticleComp = withDataFetcher(`/_posts/json/${this.props.match.params.mdFile}.json`)(Article);

    return (
      <div>
        <Header headingHidden={true} />
        <ArticleComp history={ this.props.history } />
        <Footer />
      </div>
    )
  }
}

export default Post;
