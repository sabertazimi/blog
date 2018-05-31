import React, { Component } from 'react';
import {
  Container,
  Label,
  Header,
  Divider,
  Dimmer,
  Icon,
  Button
} from 'semantic-ui-react';

import ReactMarkdown from './ReactMarkdown.js';
import { PREVIEW_CHARS, PRIMARY_COLOR } from '../constants';

class BlurringMarkdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmerActive: false
    };
  }

  handleShow = () => {
    this.setState({ dimmerActive: true });
  }

  handleHide = () => {
    this.setState({ dimmerActive: false });
  }

  render() {
    const { mdFile } = this.props;
    const { dimmerActive } = this.state;

    return (
      <Dimmer.Dimmable
        dimmed={dimmerActive}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        style={{ marginTop: '-1em', marginBottom: '3em' }}
        blurring
        >
        <Dimmer active={dimmerActive} >
          <Button as='a' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animated='fade' color={PRIMARY_COLOR} inverted size='large' href={`/posts/${mdFile.fileName}`}>
            <Button.Content visible>
              Read More
            </Button.Content>
            <Button.Content hidden>
              <Icon inverted name='right arrow' />
            </Button.Content>
          </Button>
        </Dimmer>
        <Container style={{ opacity: '0.5' }}>
          <ReactMarkdown
            value={ mdFile.__content.substring(0, mdFile.__content.length > PREVIEW_CHARS ? PREVIEW_CHARS : mdFile.__content.length) }
            />
        </Container>
      </Dimmer.Dimmable>
    );
  }
}

class PostPreview extends Component {
  constructor(props) {
    super(props);
    this.colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];
  }

  getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return this.colors[colorIdx];
  }

  render() {
    const { mdFile } = this.props;
    const tagName = (mdFile.tags ? mdFile.tags[0] : 'Computer Science');

    return (
      <Container text>
        <Label as='a' color={this.getRandomColor()} href={`/tags/${tagName}`} ribbon>{ tagName }</Label>
        <Header as='h2' style={{ fontSize: '1.5em' }}>{ mdFile.title || 'Article' }</Header>
        <Label color='black'>Posted on { (new Date(mdFile.date)).toDateString() || 'Nowadays' } </Label>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em' }}
          >
          { mdFile.subtitle || 'CS Learner' }
        </Divider>
        <BlurringMarkdown mdFile={mdFile} />
      </Container>
    );
  }
}

export default PostPreview;
