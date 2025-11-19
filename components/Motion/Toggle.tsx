'use client'

import type { MotionProps } from 'framer-motion'
import type { KeyboardEvent, ReactNode } from 'react'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback } from 'react'
import styles from './Toggle.module.css'

interface Props {
  isToggled: boolean
  onToggle?: () => void
  iconClose: ReactNode
  iconOpen: ReactNode
  shouldReduceMotion: boolean | null
  className?: string
  tabIndex?: number
}

const closeVariants: MotionProps['initial'] & MotionProps['exit'] = {
  rotate: 180,
  scale: 0,
  opacity: 0,
  transition: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  },
}

const openVariants: MotionProps['animate'] = {
  rotate: 0,
  scale: 1,
  opacity: 1,
  transition: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
  },
}

function Toggle({
  isToggled,
  onToggle,
  iconClose,
  iconOpen,
  className,
  shouldReduceMotion,
  tabIndex = 0,
  ...props
}: Props) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && onToggle)
        onToggle()
    },
    [onToggle],
  )

  return (
    <div
      key="toggle-wrapper"
      data-testid="toggle-wrapper"
      tabIndex={tabIndex}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={cx(styles.wrapper, className)}
      {...props}
    >
      <AnimatePresence initial={false}>
        {!isToggled
          ? (
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
            )
          : (
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
  )
}

export default Toggle
