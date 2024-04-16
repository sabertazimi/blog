import { Typography } from 'antd'
import cx from 'classnames'
import type { ReactNode } from 'react'
import styles from './Paragraph.module.css'

interface Props {
  children?: ReactNode
  className?: string
}

function Paragraph({ children, className, ...props }: Props): JSX.Element {
  return (
    <Typography.Paragraph
      {...props}
      className={cx(className, styles.p, 'dark:text-light')}
    >
      {children}
    </Typography.Paragraph>
  )
}

export default Paragraph
