import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Label,
  Divider,
  Container,
  Segment
} from 'semantic-ui-react';

import Error from './Error.js';
import PageLoader from './PageLoader.js';

class TagsCloud extends Component {
  constructor(props) {
    super(props);
    this.colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];
  }

  getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * 11);
    return this.colors[colorIdx];
  }

  render() {
    const { data, error, isLoading } = this.props;

    if (error) {
      return (
        <Error message={ { header:'Bad Request' } } history={ this.props.history }/>
      );
    }

    if (isLoading || !data) {
      return (
        <PageLoader message='Loading' />
      );
    }

    const tags = Object.keys(data).sort((a, b) => { return data[b] - data[a] });

    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            Tags
          </Divider>
          <Label.Group tag>
            {
              tags.map((tag) => {
                return (
                  <Label key={ tag } color={ this.getRandomColor() } as={ NavLink } to={ `/tags/${tag}` }>{ tag } &nbsp;&nbsp; { data[tag] }</Label>
                );
              })
            }
          </Label.Group>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em' }}
            >
            Tags
          </Divider>
        </Container>
      </Segment>
    );
  }
}

export default TagsCloud;
