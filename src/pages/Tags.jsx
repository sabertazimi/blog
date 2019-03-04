import React, { Component } from 'react';

import { TagsCloud, withDataFetcher } from '../components';
import { PostPreviews } from '../containers';
import { SimpleLayout } from '../layouts';

import { PREVIEW_PER_PAGE } from '../constants';

class Tags extends Component {
  postsDataHandler = data => {
    let pageCnt = 0;

    data = data.filter(mdFile => {
      if (
        mdFile.tags &&
        mdFile.tags.includes(this.props.match.params.tagName)
      ) {
        mdFile.pageId = Math.floor(pageCnt / PREVIEW_PER_PAGE) + 1;
        pageCnt += 1;
        return true;
      } else {
        return false;
      }
    });

    if (pageCnt === 0) {
      return null;
    }

    return data;
  };

  tagsDataHandler = data => {
    return data;
  };

  render() {
    const tagName = this.props.match.params.tagName;

    if (tagName === 'all') {
      const TagsCloudComp = withDataFetcher(
        `/_posts/json/tags.json`,
        this.tagsDataHandler
      )(TagsCloud);

      return (
        <SimpleLayout>
          <TagsCloudComp history={this.props.history} />
        </SimpleLayout>
      );
    } else {
      const PostPreviewsComp = withDataFetcher(
        `/_posts/json/posts.json`,
        this.postsDataHandler
      )(PostPreviews);

      return (
        <SimpleLayout>
          <PostPreviewsComp history={this.props.history} />
        </SimpleLayout>
      );
    }
  }
}

export default Tags;
