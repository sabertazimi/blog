import type { MotionProps } from '@components/utils'
import { motion } from '@components/utils'
import type { AriaRole } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  role?: AriaRole
  open?: boolean
  onClick?: () => void
  variants?: MotionProps['variants']
  transition?: MotionProps['transition']
}

const defaultVariants: MotionProps['variants'] = {
  open: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
}

const defaultTransition: MotionProps['transition'] = {
  type: 'spring',
  duration: 0.2,
}

function Switch({
  children,
  className,
  role = 'switch',
  open = true,
  variants = defaultVariants,
  transition = defaultTransition,
  onClick,
  ...props
}: Props): JSX.Element {
  return (
    <motion.div
      className={className}
      role={role}
      initial="close"
      animate={open ? 'open' : 'close'}
      variants={variants}
      transition={transition}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Switch
