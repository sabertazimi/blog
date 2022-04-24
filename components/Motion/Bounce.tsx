import classnames from 'classnames';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Bounce = ({
  children,
  className,
  delay = 0,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={classnames('inline-flex', className)}
    layout
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ x: -5 }}
    whileTap={{ x: 5 }}
    transition={{
      type: 'spring',
      delay,
      stiffness: 100,
    }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Bounce;
