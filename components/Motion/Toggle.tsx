import type { MotionProps } from '@components/utils';
import { AnimatePresence, classNames, motion } from '@components/utils';
import type { ReactNode } from 'react';
import styles from './Toggle.module.css';

interface Props {
  isToggled: boolean;
  onToggle: () => void;
  iconClose: ReactNode;
  iconOpen: ReactNode;
  shouldReduceMotion: boolean;
  className?: string;
}

const closeVariants: MotionProps['initial'] & MotionProps['animate'] = {
  rotate: 180,
  scale: 0,
  opacity: 0,
  transition: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  },
};

const openVariants: MotionProps['animate'] = {
  rotate: 0,
  scale: 1,
  opacity: 1,
  transition: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  },
};

const Toggle = ({
  isToggled,
  onToggle,
  iconClose,
  iconOpen,
  className,
  shouldReduceMotion,
  ...props
}: Props): JSX.Element => (
  <div
    key="toggle-wrapper"
    tabIndex={0}
    onClick={onToggle}
    onKeyDown={onToggle}
    className={classNames(styles.wrapper, className)}
    {...props}
  >
    <AnimatePresence initial={false}>
      {!isToggled ? (
        <motion.span
          key="toggle-span-close"
          initial={closeVariants}
          animate={!shouldReduceMotion ? openVariants : closeVariants}
          exit={closeVariants}
          aria-current={!isToggled}
          className={styles.span}
        >
          {iconClose}
        </motion.span>
      ) : (
        <motion.span
          key="toggle-span-open"
          initial={closeVariants}
          animate={!shouldReduceMotion ? openVariants : closeVariants}
          exit={closeVariants}
          aria-current={isToggled}
          className={styles.span}
        >
          {iconOpen}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

export default Toggle;
