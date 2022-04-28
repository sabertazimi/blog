import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H1 = (props: Props): JSX.Element => <Heading {...props} level={1} />;

export default H1;
