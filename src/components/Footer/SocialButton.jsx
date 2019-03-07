import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants';

const SocialButton = ({ type, url }) => (
  <Button as="a" inverted icon circular href={`${url}`} color={PRIMARY_COLOR} style={{ margin: '0 1em' }}>
    <Icon name={`${type}`} size="big" />
  </Button>
);

export default SocialButton;
