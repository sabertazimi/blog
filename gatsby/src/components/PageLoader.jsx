import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const PageLoader = ({ message }) => (
  <Dimmer
    active
    style={{
      paddingTop: '100px',
    }}
  >
    <Loader>{message || 'Loading'}</Loader>
  </Dimmer>
);

export default PageLoader;
