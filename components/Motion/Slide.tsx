import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const SlideRight = ({
  children,
  className,
  delay = 0,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={className}
    layout
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

const SlideUp = ({
  children,
  className,
  delay = 0,
  duration = 1,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={className}
    layout
    initial={{ opacity: 0, y: -200 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      type: 'spring',
      delay,
      duration: 1,
    }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

export { SlideRight, SlideUp };
