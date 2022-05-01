import { classNames } from '@components/utils';
import type { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Container = ({ children, className, ...props }: Props): JSX.Element => (
  <div
    className={classNames(
      'container relative block h-full mx-auto my-0 p-auto',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Container;
