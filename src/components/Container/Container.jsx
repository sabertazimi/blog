import React from 'react';

const Container = ({ style, className, children, ...props }) => (
  <div
    style={{ ...style }}
    className={`container relative block h-full mx-auto my-0 p-auto ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Container;
