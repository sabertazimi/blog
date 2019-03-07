import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Link } from 'gatsby';
import { Container, Dimmer, Button } from 'semantic-ui-react';

import { PRIMARY_COLOR } from '../../constants';

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
      <Spring
        to={{ opacity: dimmerActive ? 1 : 0 }}
      >
        {props => (
          <Button
            as={Link}
            style={{
              ...props,
              position: 'absolute',
              top: '50%',
              left: '50%',
              margin: 0,
              transform: 'translate(-50%, -50%)',
            }}
            inverted
            color={PRIMARY_COLOR}
            size="large"
            to={`${post.slug}`}
          >
            Read More
          </Button>
        )}
      </Spring>
    </Dimmer>
    <Container style={{ opacity: '0.5' }}>
      <div>{post.excerpt}</div>
    </Container>
  </Dimmer.Dimmable>
);

export default PreviewMarkdown;
