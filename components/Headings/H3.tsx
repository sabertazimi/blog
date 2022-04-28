import type { ReactNode } from 'react';
import Heading from './Heading';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H3 = (props: Props): JSX.Element => <Heading {...props} level={3} />;

export default H3;
