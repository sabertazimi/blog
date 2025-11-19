import type { BuildTime, PostMeta } from '@/types'
import * as React from 'react'
import SiteHeader from '@/components/site-header'

interface Props {
  banner: string
  posts: PostMeta[]
  buildTime: BuildTime
  children: React.ReactNode
}

function Layout({ banner, posts, buildTime, children }: Props) {
  return (
    <div>
      <SiteHeader posts={posts} />
      <main>{posts.toString()}</main>
      <div className="divider">{banner}</div>
      <section>{children}</section>
      <footer>{buildTime.toString()}</footer>
    </div>
  )
}

export default Layout
