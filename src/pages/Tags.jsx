import React, { Component } from 'react';

import {
  Footer,
  TagsCloud,
  withDataFetcher
} from '../components';

import {
  Header,
  PostPreviews,
} from '../containers';

import { PREVIEW_PER_PAGE } from '../constants';

class Tags extends Component {
  postsDataHandler = (data) => {
    let pageCnt = 0;

    data = data.filter((mdFile) => {
      if (mdFile.tags && mdFile.tags.includes(this.props.match.params.tagName)) {
        mdFile.pageId = Math.floor(pageCnt / PREVIEW_PER_PAGE) + 1;
        pageCnt += 1;
        return true;
      } else {
        return false;
      }
    });

    if (pageCnt === 0) {
      return null
    }

    return data;
  }

  tagsDataHandler = (data) => {
    return data;
  }

  render() {
    const tagName = this.props.match.params.tagName;

    if (tagName === 'all') {
      const TagsCloudComp = withDataFetcher(`/_posts/json/tags.json`, this.tagsDataHandler)(TagsCloud);

      return (
        <div>
          <Header headingHidden={true} />
          <TagsCloudComp history={ this.props.history } />
          <Footer />
        </div>
      );
    } else {
      const PostPreviewsComp = withDataFetcher(`/_posts/json/posts.json`, this.postsDataHandler)(PostPreviews);

      return (
        <div>
          <Header headingHidden={true} />
          <PostPreviewsComp history={ this.props.history } />
          <Footer />
        </div>
      );
    }
  }
}

export default Tags;
