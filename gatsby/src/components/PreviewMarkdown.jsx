import React from 'react';
import { Container, Dimmer, Icon, Button, Label } from 'semantic-ui-react';

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
      <Label
        as="a"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          padding: 0,
          transform: 'translate(-50%, -50%)',
        }}
        href={`${post.slug}`}
      >
        <Button style={{ margin: 0 }} animated="fade" color={PRIMARY_COLOR} size="large">
          <Button.Content visible>Read More</Button.Content>
          <Button.Content hidden>
            <Icon inverted name="right arrow" />
          </Button.Content>
        </Button>
      </Label>
    </Dimmer>
    <Container style={{ opacity: '0.5' }}>
      <div>{post.excerpt}</div>
    </Container>
  </Dimmer.Dimmable>
);

export default PreviewMarkdown;
