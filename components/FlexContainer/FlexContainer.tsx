import type { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const FlexContainer = ({
  className = '',
  children,
  ...props
}: Props): JSX.Element => (
  <div
    className={`flex-container container relative h-full mx-auto my-0 p-auto ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default FlexContainer;
