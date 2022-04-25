import type { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const Container = ({
  className = '',
  children,
  ...props
}: Props): JSX.Element => (
  <div
    className={`container relative block h-full mx-auto my-0 p-auto ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Container;
