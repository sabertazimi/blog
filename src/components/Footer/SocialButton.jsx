import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const SocialButton = ({ type, url }) => (
  <Button
    as="a"
    icon
    circular
    href={`${url}`}
    color="black"
    style={{ margin: '0 1em' }}
  >
    <Icon name={`${type}`} size="big" />
  </Button>
);

export default SocialButton;
