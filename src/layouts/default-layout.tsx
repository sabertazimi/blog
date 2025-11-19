import type { BuildTime, PostMeta } from '@/types'
import * as React from 'react'
import Banner from '@/components/banner'
import SiteHeader from '@/components/site-header'

interface Props {
  banner: string
  posts: PostMeta[]
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ banner, posts, buildTime, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader posts={posts} />
      <div className="container flex-1 mx-auto">
        <Banner>{banner}</Banner>
        {children}
      </div>
      <footer>{buildTime.toString()}</footer>
    </div>
  )
}

export default Layout
