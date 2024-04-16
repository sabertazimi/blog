import type { DividerProps } from 'antd'
import { Divider as AntDivider } from 'antd'
import cx from 'classnames'
import styles from './Divider.module.css'

interface Props extends DividerProps {}

function Divider({
  type = 'horizontal',
  className,
  children,
}: Props): JSX.Element {
  return (
    <AntDivider
      type={type}
      className={cx(
        styles.divider,
        className,
        'dark:!border-light dark:text-light',
      )}
    >
      {children}
    </AntDivider>
  )
}

export default Divider
