import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H5 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={5} className={classNames(className, 'mt-3')} />
);

export default H5;
