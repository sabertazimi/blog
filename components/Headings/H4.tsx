import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H4 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={4} className={classNames(className, 'mt-6')} />
);

export default H4;
