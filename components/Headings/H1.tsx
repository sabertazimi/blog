import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H1 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={1} className={classNames(className, 'mt-48')} />
);

export default H1;
