import cx from 'classnames'
import type { ReactNode } from 'react'
import styles from './Aside.module.css'
import Alert from '@/components/Alert'

interface Props {
  type?: string
  title?: string
  children?: ReactNode
  className?: string
}

function normalizeType(type?: string) {
  switch (type) {
    case 'success':
    case 'tip':
      return 'success'
    case 'info':
    case 'note':
      return 'info'
    case 'warning':
    case 'caution':
      return 'warning'
    case 'error':
    case 'danger':
      return 'error'
    default:
      return 'info'
  }
}

function Aside({
  type,
  title,
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <Alert
      {...props}
      type={normalizeType(type)}
      message={title}
      description={children}
      showIcon
      className={cx(
        className,
        styles.admonition,
        'dark:shadow-xl dark:shadow-primary',
      )}
    />
  )
}

export default Aside
