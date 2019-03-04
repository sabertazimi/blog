import React from 'react';

import { Footer } from '../components';
import { Header } from '../containers';

const LandingLayout = ({ children }) => (
  <div>
    <Header />
    { children }
    <Footer />
  </div>
);

export default LandingLayout;
