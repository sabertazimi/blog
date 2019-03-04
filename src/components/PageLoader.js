import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const PageLoader = ({ message }) => (
  <Dimmer active>
    <Loader>{message || 'Loading'}</Loader>
  </Dimmer>
);

export default PageLoader;
