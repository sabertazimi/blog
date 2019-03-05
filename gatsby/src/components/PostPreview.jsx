import React, { Component } from 'react';
import { Container, Label, Header, Divider } from 'semantic-ui-react';
import PreviewMarkdown from './PreviewMarkdown';
import './PostPreview.css';

class PostPreview extends Component {
  state = {
    dimmerActive: false,
  };

  colors = [
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
    'grey',
  ];

  handleShow = () => {
    this.setState({ dimmerActive: true });
  };

  handleHide = () => {
    this.setState({ dimmerActive: false });
  };

  getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return this.colors[colorIdx];
  };

  render() {
    const { mdFile } = this.props;
    const { dimmerActive } = this.state;
    const tagName = mdFile.tags ? mdFile.tags[0] : 'Computer Science';

    return (
      <Container
        text
        style={{
          width: '100%',
          marginBottom: '2em',
          padding: '1em 1.2em',
        }}
        className="cell"
      >
        <Label
          as="a"
          color={this.getRandomColor()}
          href={`/tags/${tagName}`}
          ribbon
        >
          {tagName}
        </Label>
        <Header as="h2" style={{ fontSize: '1.5em' }}>
          {mdFile.title || 'Article'}
        </Header>
        <Label color="black">
          Posted on {new Date(mdFile.date).toDateString() || 'Nowadays'}{' '}
        </Label>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em' }}
        >
          {mdFile.subtitle || 'CS Learner'}
        </Divider>
        <PreviewMarkdown
          mdFile={mdFile}
          dimmerActive={dimmerActive}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
        />
      </Container>
    );
  }
}

export default PostPreview;
