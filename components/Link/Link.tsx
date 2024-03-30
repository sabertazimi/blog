import NextLink from 'next/link'
import type { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

function Link({ href, children, className }: Props): JSX.Element {
  return (
    <NextLink href={href} legacyBehavior>
      <a className={className}>{children}</a>
    </NextLink>
  )
}

export default Link
