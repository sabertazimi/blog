import type { BuildTime, Metadata } from '@/types'
import * as React from 'react'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

interface Props {
  metadata: Metadata
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ metadata, buildTime, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader metadata={metadata} />
      <main className="bg-background relative flex flex-1 flex-col">{children}</main>
      <SiteFooter buildTime={buildTime} />
    </div>
  )
}

export default Layout
