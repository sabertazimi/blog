import React from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const FlexContainer = ({
  className = '',
  style = {},
  children,
  ...props
}: Props): JSX.Element => (
  <div
    className={`flex-container container relative h-full mx-auto my-0 p-auto ${className}`}
    style={{ ...style }}
    {...props}
  >
    {children}
  </div>
);

export default FlexContainer;
