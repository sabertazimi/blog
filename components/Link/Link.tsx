import type { ReactNode } from 'react'
import NextLink from 'next/link'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

function Link({ href, children, className }: Props) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  )
}

export default Link
