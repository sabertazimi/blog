import React, { Component } from 'react';

import { Article, withDataFetcher } from '../components';
import { SimpleLayout } from '../layouts';

class Post extends Component {
  render() {
    const ArticleComp = withDataFetcher(
      `/_posts/json/${this.props.match.params.mdFile}.json`
    )(Article);

    return (
      <SimpleLayout>
        <ArticleComp history={this.props.history} />
      </SimpleLayout>
    );
  }
}

export default Post;
