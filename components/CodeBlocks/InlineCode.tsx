import cx from 'classnames'
import styles from './InlineCode.module.css'

interface Props {
  children?: string
  className?: string
}

function InlineCode({ children, className }: Props): JSX.Element {
  return (
    <code
      className={cx(
        className,
        styles.code,
        'dark:text-light dark:shadow-xl dark:shadow-primary',
      )}
    >
      {children}
    </code>
  )
}

export default InlineCode
