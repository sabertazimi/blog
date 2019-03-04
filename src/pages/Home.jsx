import React, { Component } from 'react';

import {
  Header,
  Footer,
  withDataFetcher
} from '../components';

import {
  PostPreviews,
} from '../containers';

class Home extends Component {
  render() {
    const PostPreviewsComp = withDataFetcher(`/_posts/json/posts.json`)(PostPreviews);

    return (
      <div>
        <Header />
        <PostPreviewsComp history={ this.props.history } />
        <Footer />
      </div>
    );
  }
}

export default Home;
