import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H2 = (props: Props): JSX.Element => <Heading {...props} level={2} />;

export default H2;
