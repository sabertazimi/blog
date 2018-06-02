import React, { Component } from 'react';

import {
  Header,
  Footer,
  PaginatedPostPreviews,
  withDataFetcher
} from '../components';

class Home extends Component {
  render() {
    const PaginatedPostPreviewsComp = withDataFetcher(`/_posts/json/posts.json`)(PaginatedPostPreviews);

    return (
      <div>
        <Header />
        <PaginatedPostPreviewsComp history={ this.props.history } />
        <Footer />
      </div>
    );
  }
}

export default Home;
