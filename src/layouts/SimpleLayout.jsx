import React from 'react';
import { Header, Footer } from '../components';

const SimpleLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default SimpleLayout;
