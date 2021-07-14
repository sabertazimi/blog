import React from 'react';
import { BreakPoints } from '@/config';

const Container = ({ style, children, ...props }) => (
  <div
    style={{
      maxWidth: BreakPoints.laptop,
      position: 'relative',
      display: 'block',
      margin: '0 auto',
      padding: '1em 3em',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export default Container;
