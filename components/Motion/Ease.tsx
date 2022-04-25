import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const Ease = ({
  children,
  className,
  delay = 0,
  duration = 1,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      delay,
      duration,
    }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Ease;
