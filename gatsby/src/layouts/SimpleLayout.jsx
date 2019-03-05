import React from 'react';

import Header from '../containers/Header';
import { Footer } from '../components';

const LandingLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default LandingLayout;
