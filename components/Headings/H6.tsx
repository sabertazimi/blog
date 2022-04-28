import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H6 = (props: Props): JSX.Element => <Heading {...props} level={5} />;

export default H6;
