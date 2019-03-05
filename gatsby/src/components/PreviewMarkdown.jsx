import React from 'react';
import { Container, Dimmer, Icon, Button } from 'semantic-ui-react';

import ReactMarkdown from './ReactMarkdown';
import { PREVIEW_CHARS, PRIMARY_COLOR } from '../constants';

const PreviewMarkdown = ({
  dimmerActive,
  onMouseEnter,
  onMouseLeave,
  mdFile,
}) => (
  <Dimmer.Dimmable
    dimmed={dimmerActive}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ marginTop: '-1em', marginBottom: '3em' }}
  >
    <Dimmer active={dimmerActive}>
      <Button
        as="a"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animated="fade"
        color={PRIMARY_COLOR}
        inverted
        size="large"
        href={`/posts/${mdFile.title}`}
      >
        <Button.Content visible>Read More</Button.Content>
        <Button.Content hidden>
          <Icon inverted name="right arrow" />
        </Button.Content>
      </Button>
    </Dimmer>
    <Container style={{ opacity: '0.5' }}>
      <ReactMarkdown
        value={mdFile.__content.substring(
          0,
          mdFile.__content.length > PREVIEW_CHARS
            ? PREVIEW_CHARS
            : mdFile.__content.length
        )}
      />
    </Container>
  </Dimmer.Dimmable>
);

export default PreviewMarkdown;
