import { cx } from '@components/utils';
import type { ReactNode } from 'react';
import Heading from './Heading';
import styles from './Headings.module.css';

interface Props {
  className?: string;
  children?: ReactNode;
}

const H3 = ({ className, ...props }: Props): JSX.Element => (
  <Heading {...props} level={3} className={cx(className, styles.h3)} />
);

export default H3;
