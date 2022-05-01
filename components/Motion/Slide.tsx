import { motion } from '@components/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Slide = ({
  children,
  className,
  delay = 0,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      type: 'spring',
      delay,
    }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Slide;
