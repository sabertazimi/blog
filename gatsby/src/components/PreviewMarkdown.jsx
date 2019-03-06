import React from 'react';
import { Link } from 'gatsby';
import { Container, Dimmer, Icon, Button } from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../constants';

const PreviewMarkdown = ({
  dimmerActive,
  onMouseEnter,
  onMouseLeave,
  post,
}) => (
  <Dimmer.Dimmable
    dimmed={dimmerActive}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ marginTop: '-1em', marginBottom: '3em' }}
  >
    <Dimmer active={dimmerActive}>
      <Button
        as={Link}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: 0,
          transform: 'translate(-50%, -50%)',
        }}
        animated="fade"
        inverted
        color={PRIMARY_COLOR}
        size="large"
        to={`${post.slug}`}
      >
        <Button.Content visible>Read More</Button.Content>
        <Button.Content hidden>
          <Icon inverted name="right arrow" />
        </Button.Content>
      </Button>
    </Dimmer>
    <Container style={{ opacity: '0.5' }}>
      <div>{post.excerpt}</div>
    </Container>
  </Dimmer.Dimmable>
);

export default PreviewMarkdown;
