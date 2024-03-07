import type { MotionProps } from '@components/utils'
import { motion } from '@components/utils'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

const initialVariants: MotionProps['initial'] = {
  opacity: 0,
}

const animateVariants: MotionProps['animate'] = {
  opacity: 1,
}

const viewport: MotionProps['viewport'] = {
  once: true,
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
    initial={initialVariants}
    animate={animateVariants}
    transition={{
      delay,
      duration,
    }}
    viewport={viewport}
    {...props}
  >
    {children}
  </motion.div>
)

export default Ease
