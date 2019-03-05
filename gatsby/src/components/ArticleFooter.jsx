import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Button, Icon } from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../constants';

// Button uses refs inside it and this means that it currently can't accept stateless components as `as`
// to purge warning message from `react`, wrap `Link` into a class component `NavLink`
class NavLink extends Component {
  render() {
    return <Link {...this.props} />;
  }
}

const ArticleFooter = ({ mdFile }) => (
  <div>
    <Button
      as={NavLink}
      to={mdFile.prevPost ? `/posts/${mdFile.prevPost}` : '/'}
      animated="fade"
      color={PRIMARY_COLOR}
      size="large"
      inverted
    >
      <Button.Content visible>Prev Post</Button.Content>
      <Button.Content hidden>
        <Icon name="left arrow" />
      </Button.Content>
    </Button>
    <Button
      as={NavLink}
      to={mdFile.nextPost ? `/posts/${mdFile.nextPost}` : '/'}
      animated="fade"
      color={PRIMARY_COLOR}
      size="large"
      floated="right"
      inverted
    >
      <Button.Content visible>Next Post</Button.Content>
      <Button.Content hidden>
        <Icon name="right arrow" />
      </Button.Content>
    </Button>
  </div>
);

export default ArticleFooter;
