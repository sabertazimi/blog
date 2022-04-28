import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H4 = (props: Props): JSX.Element => <Heading {...props} level={4} />;

export default H4;
