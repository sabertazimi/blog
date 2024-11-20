import type { HTMLProps } from 'react'
import { ArrowRight } from '@/components/Icons'
import { siteConfig } from '@/config'
import cx from 'classnames'
import styles from './Item.module.css'

interface Props extends HTMLProps<HTMLLIElement> {}

function Item({ children, className, ...props }: Props): JSX.Element {
  return (
    <li {...props} className={cx(className, styles.item, 'dark:text-light')}>
      <ArrowRight style={{ color: siteConfig.themeColor }} />
      <div>{children}</div>
    </li>
  )
}

export default Item
