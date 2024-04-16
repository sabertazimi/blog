import { Typography } from 'antd'
import type { TitleProps } from 'antd/lib/typography/Title'
import cx from 'classnames'
import styles from './Headings.module.css'

// Keep `H3` `margin-top`.
function Heading({
  children,
  className,
  ...props
}: TitleProps): JSX.Element {
  return (
    <Typography.Title
      {...props}
      className={cx('mdx-heading dark:text-light', styles.heading, className)}
    >
      {children}
    </Typography.Title>
  )
}

export default Heading
