import React from 'react';
import { Link } from 'gatsby';
import { Container, Dimmer, Button, Icon } from 'semantic-ui-react';
import { PRIMARY_COLOR } from 'config';

const PreviewMarkdown = ({ post }) => (
  <Dimmer.Dimmable
    dimmed={true}
    blurring={false}
    style={{ marginTop: '-1em', marginBottom: '3em' }}
  >
    <Dimmer active={true}>
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
        color={PRIMARY_COLOR}
        size="large"
        to={`${post.slug}`}
      >
        <Button.Content visible>Read More</Button.Content>
        <Button.Content hidden>
          <Icon name="right arrow" />
        </Button.Content>
      </Button>
    </Dimmer>
    <Container style={{ opacity: '0.5' }}>
      <div>{post.excerpt}</div>
    </Container>
  </Dimmer.Dimmable>
);

export default PreviewMarkdown;
