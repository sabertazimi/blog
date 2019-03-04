import React, { Component } from 'react';

import { withDataFetcher } from '../components';
import { PostPreviews } from '../containers';
import { LandingLayout } from '../layouts';

class Home extends Component {
  render() {
    const PostPreviewsComp = withDataFetcher(`/_posts/json/posts.json`)(PostPreviews);

    return (
      <LandingLayout>
        <PostPreviewsComp history={ this.props.history } />
      </LandingLayout>
    );
  }
}

export default Home;
