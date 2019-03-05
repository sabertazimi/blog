import React from 'react';
import { SimpleLayout } from '../layouts/';

export default () => (
  <SimpleLayout>
    <div style={{ margin: '3rem auto', maxWidth: 600 }}>
      <h2>About me</h2>
      <p style={{ fontSize: '18px' }}>
        I'm sabertazimi, please mail to{' '}
        <a href="mailto:sabertazimi@gmail.com">sabertazimi@gmail.com</a>
      </p>
    </div>
  </SimpleLayout>
);
