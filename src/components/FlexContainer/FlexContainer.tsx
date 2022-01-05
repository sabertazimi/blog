import type { CSSProperties, HTMLProps, ReactNode } from 'react';
import React from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
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
