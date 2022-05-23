import { cx } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H6 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={5} className={cx(className, 'mt-1.5')} />
);

export default H6;
