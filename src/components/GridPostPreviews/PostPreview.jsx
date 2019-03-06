import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Container, Label } from 'semantic-ui-react';
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
    const { post } = this.props;
    const { dimmerActive } = this.state;
    const tagName = post.tags ? post.tags[0] : 'Computer Science';

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
          as={Link}
          color={this.getRandomColor()}
          to={`/tags/${tagName}`}
          ribbon
        >
          {tagName}
        </Label>
        <h2 style={{ paddingTop: '1rem' }}>
          {post.title || 'Article'}
        </h2>
        <Label color="black" style={{ marginBottom: '3rem' }}>
          Posted on {new Date(post.date).toDateString() || 'Nowadays'}{' '}
        </Label>
        <PreviewMarkdown
          post={post}
          dimmerActive={dimmerActive}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
        />
      </Container>
    );
  }
}

export default PostPreview;
