import type { ReactNode } from 'react'
import styles from './LandingNavLink.module.css'
import Link from '@/components/Link'
import { Bounce } from '@/components/Motion'
import Tooltip from '@/components/Tooltip'

interface Props {
  title: string
  href: string
  children: ReactNode
}

function LandingNavLink({ title, href, children }: Props): JSX.Element {
  return (
    <Tooltip className={styles.tooltip} placement="left" title={title}>
      <Bounce>
        <span className={styles.link} role="link">
          <Link href={href}>{children}</Link>
        </span>
      </Bounce>
    </Tooltip>
  )
}

export default LandingNavLink
