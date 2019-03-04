import React from 'react';

import { Footer } from '../components';
import { Header } from '../containers';

const LandingLayout = ({ children }) => (
  <div>
    <Header headingHidden={true} />
    { children }
    <Footer />
  </div>
);

export default LandingLayout;
