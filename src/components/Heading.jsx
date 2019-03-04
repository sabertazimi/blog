import React from 'react';
import { Image } from 'semantic-ui-react';

import headingPNG from '../heading.png';

const Heading = ({ headingHidden }) => (
  <Image
    src={headingPNG}
    fluid={!headingHidden && true}
    hidden={headingHidden || false}
  />
);

export default Heading;
