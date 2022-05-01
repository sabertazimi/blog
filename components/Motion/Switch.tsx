import type { AnimationProps } from '@components/utils';
import { motion } from '@components/utils';
import type { AriaRole } from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  role?: AriaRole;
  open?: boolean;
  variants?: AnimationProps['variants'];
  transition?: AnimationProps['transition'];
}

const Switch = ({
  children,
  className,
  role = 'switch',
  open = true,
  variants = {
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  },
  transition = {
    type: 'spring',
    duration: 0.2,
  },
}: Props): JSX.Element => (
  <motion.div
    className={className}
    role={role}
    initial="close"
    animate={open ? 'open' : 'close'}
    variants={variants}
    transition={transition}
  >
    {children}
  </motion.div>
);

export default Switch;
