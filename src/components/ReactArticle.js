import React, { Component } from 'react';
import {
  Segment,
  Container,
  Header,
  Divider,
  Button,
  Icon,
  Label
} from 'semantic-ui-react';

import Error from './Error.js';
import PageLoader from './PageLoader.js';
import ReactMarkdown from './ReactMarkdown.js';
import ScrollToTopButton from './ScrollToTopButton.js';
import { PRIMARY_COLOR } from '../constants';

import './ReactArticle.css';

class ReactArticle extends Component {
  constructor(props) {
    super(props);
    this.colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];
  }

  getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return this.colors[colorIdx];
  }

  loadDisqus = () => {
    const script = document.createElement('script');
    script.src = 'https://http-blog-hust-cf.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());

    if (document.getElementById('disqus_thread')) {
      (document.body || document.head).appendChild(script);
    }
  }

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
        <Error message ={{ header:'Bad Request' }} history={ this.props.history }/>
      );
    }

    if (isLoading || !data) {
      return (
        <PageLoader message='Loading' />
      );
    }

    const mdFile = data;

    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          {
            mdFile.tags ? mdFile.tags.map((tag, index) => {
              return <Label key={index} as='a' href={ `/tags/${tag}` } color={this.getRandomColor()} tag>{tag}</Label>
            }) : <Label as='a' href='/tags/all' color={this.getRandomColor()} tag>CS</Label>
          }
          <Header as='h1' color={this.getRandomColor()} style={{ fontSize: '4em' }}>{ mdFile.title || 'Article' }</Header>
          <Label color='black'>Posted on { (new Date(mdFile.date)).toDateString() || 'Nowadays' } </Label>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            { mdFile.subtitle || 'Blog' }
          </Divider>
          <ReactMarkdown
            value={ mdFile.__content }
            />
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            { mdFile.subtitle || 'Blog' }
          </Divider>
          <Button animated='fade' color={PRIMARY_COLOR} inverted size='large' onClick={this.props.history.goBack}>
            <Button.Content visible>
              Back
            </Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow'/>
            </Button.Content>
          </Button>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            <Icon color={ PRIMARY_COLOR } name='comments outline' />
          </Divider>
          <div id='disqus_thread'></div>
        </Container>
        <ScrollToTopButton />
      </Segment>
    );
  }
}

export default ReactArticle;
