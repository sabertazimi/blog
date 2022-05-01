import type { MotionProps } from '@components/utils';
import { motion } from '@components/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const initialVariants: MotionProps['initial'] = {
  opacity: 0,
  x: -200,
};

const inViewVariants: MotionProps['whileInView'] = {
  opacity: 1,
  x: 0,
};

const viewport: MotionProps['viewport'] = {
  once: true,
};

const Slide = ({
  children,
  className,
  delay = 0,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={className}
    initial={initialVariants}
    whileInView={inViewVariants}
    transition={{
      type: 'spring',
      delay,
    }}
    viewport={viewport}
    {...props}
  >
    {children}
  </motion.div>
);

export default Slide;
