import { cx } from '@components/utils';
import type { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const FlexContainer = ({
  children,
  className,
  ...props
}: Props): JSX.Element => (
  <div
    className={cx(
      'flex-container container relative h-full mx-auto my-0 p-auto',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default FlexContainer;
