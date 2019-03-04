import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Segment,
  Container,
  Divider,
  Button,
  Icon,
} from 'semantic-ui-react';

import Error from './Error';
import PageLoader from './PageLoader';
import ArticleHeader from './ArticleHeader';
import ReactMarkdown from './ReactMarkdown';
import ScrollToTopButton from './ScrollToTopButton';
import { PRIMARY_COLOR } from '../constants';

import './Article.css';

// Button uses refs inside it and this means that it currently can't accept stateless components as `as`
// to purge warning message from `react`, wrap `NavLink` into a class component `NavLinkComp`
class NavLinkComp extends Component {
  render() {
    return <NavLink {...this.props} />;
  }
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.headerColor = this.getRandomColor();
  }

  getRandomColor = () => {
    const colors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey'
    ];
    const colorIdx = Math.floor(Math.random() * 11);
    return colors[colorIdx];
  };

  loadDisqus = () => {
    const script = document.createElement('script');
    script.src = 'https://http-blog-hust-cf.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());

    if (document.getElementById('disqus_thread')) {
      (document.body || document.head).appendChild(script);
    }
  };

  componentDidMount() {
    this.loadDisqus();
  }

  componentDidUpdate() {
    this.loadDisqus();
  }

  render() {
    const { data, error, isLoading } = this.props;

    if (error) {
      return (
        <Error
          message={{ header: 'Bad Request' }}
          history={this.props.history}
        />
      );
    }

    if (isLoading || !data) {
      return <PageLoader message="Loading" />;
    }

    const mdFile = data;

    return (
      <Segment style={{ padding: '0em 0em' }} vertical>
        <ArticleHeader color={this.headerColor} mdFile={mdFile} />
        <Container text>
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: '3em 0em' }}
          >
            {mdFile.subtitle || 'Blog'}
          </Divider>
          <ReactMarkdown value={mdFile.__content} />
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: '3em 0em' }}
          >
            {mdFile.subtitle || 'Blog'}
          </Divider>
          <Button
            as={NavLinkComp}
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
            as={NavLinkComp}
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
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: '3em 0em' }}
          >
            <Icon color={PRIMARY_COLOR} name="comments outline" />
          </Divider>
          <div id="disqus_thread" />
        </Container>
        <ScrollToTopButton />
      </Segment>
    );
  }
}

export default Article;
