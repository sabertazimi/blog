import React from 'react';

const Container = ({ style, className, children, ...props }) => (
  <div
    style={{ ...style }}
    className={`container block relative mx-auto my-0  ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Container;
