import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'gatsby';
import { Container, Dimmer, Button } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';

const PreviewMarkdown = ({
  dimmerActive,
  onMouseEnter,
  onMouseLeave,
  post,
}) => {
  const props = useSpring({
    opacity: dimmerActive ? 1 : 0,
  });

  return (
    <Dimmer.Dimmable
      dimmed={dimmerActive}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ marginTop: '-1em', marginBottom: '3em' }}
    >
      <Dimmer active={dimmerActive}>
        <animated.div style={props}>
          <Button
            as={Link}
            style={{
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
        </animated.div>
      </Dimmer>
      <Container style={{ opacity: '0.5' }}>
        <div>{post.excerpt}</div>
      </Container>
    </Dimmer.Dimmable>
  );
};

export default PreviewMarkdown;
