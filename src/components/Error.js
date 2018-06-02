import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Message,
  Button,
  Icon,
  Segment
} from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../constants';

class Error extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { message, history } = this.props;

    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Message icon color={ PRIMARY_COLOR }>
            <Icon name='warning circle' color={ PRIMARY_COLOR } />
            <Message.Content>
              <Message.Header> { message.header || 'Bad Request' }</Message.Header>
              <p> { message.content || 'Please retry later ...' }</p>
            </Message.Content>
          </Message>
          <Button animated='fade' color={PRIMARY_COLOR} inverted size='large' onClick={history.goBack}>
            <Button.Content visible>
              Back
            </Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow'/>
            </Button.Content>
          </Button>
        </Container>
      </Segment>
    );
  }
}

export default Error;
