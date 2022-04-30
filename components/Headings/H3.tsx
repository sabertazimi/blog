import { classNames } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H3 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={3} className={classNames(className, 'mt-12')} />
);

export default H3;
