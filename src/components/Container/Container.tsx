import React from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Container = ({
  className = '',
  style = {},
  children,
  ...props
}: Props): JSX.Element => (
  <div
    className={`container relative block h-full mx-auto my-0 p-auto ${className}`}
    style={{ ...style }}
    {...props}
  >
    {children}
  </div>
);

export default Container;
