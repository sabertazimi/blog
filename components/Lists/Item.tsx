import cx from 'classnames'
import type { HTMLProps } from 'react'
import styles from './Item.module.css'
import { siteConfig } from '@/config'
import { ArrowRight } from '@/components/Icons'

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
