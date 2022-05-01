import type { MotionProps } from '@components/utils';
import { classNames, motion } from '@components/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const initialVariants: MotionProps['initial'] = {
  opacity: 0,
  x: 20,
};

const inViewVariants: MotionProps['whileInView'] = {
  opacity: 1,
  x: 0,
};

const hoverVariants: MotionProps['whileHover'] = {
  x: -5,
};

const tapVariants: MotionProps['whileTap'] = {
  x: 5,
};

const viewport: MotionProps['viewport'] = {
  once: true,
};

const Bounce = ({
  children,
  className,
  delay = 0,
  ...props
}: Props): JSX.Element => (
  <motion.div
    className={classNames('inline-flex', className)}
    initial={initialVariants}
    whileInView={inViewVariants}
    whileHover={hoverVariants}
    whileTap={tapVariants}
    transition={{
      type: 'spring',
      delay,
      stiffness: 100,
    }}
    viewport={viewport}
    {...props}
  >
    {children}
  </motion.div>
);

export default Bounce;
