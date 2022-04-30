import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H6 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={5} className={classNames(className, 'mt-1.5')} />
);

export default H6;
