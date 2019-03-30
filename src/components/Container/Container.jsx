import React from 'react';
import { BreakPoints } from 'config';

const Container = ({ children, style, ...rest }) => (
  <div
    style={{
      maxWidth: BreakPoints.laptop,
      position: 'relative',
      display: 'block',
      margin: '0 auto',
      padding: '1em 3em',
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
