import React from 'react';

const Container = ({ style, children, ...props }) => (
  <div
    style={{
      position: 'relative',
      display: 'block',
      margin: '0 auto',
      maxWidth: '100%',
      width: '100%',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export default Container;
