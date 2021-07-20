import React from 'react';

const Container = ({ style, className, children, ...props }) => (
  <div
    className={`container relative block h-full mx-auto my-0 p-auto ${className}`}
    style={{ ...style }}
    {...props}
  >
    {children}
  </div>
);

export default Container;
