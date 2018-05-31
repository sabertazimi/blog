import React, { Component } from 'react';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import PaginatedPostPreviews from '../components/PaginatedPostPreviews.js';
import withDataFetcher from '../components/withDataFetcher.js';

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
