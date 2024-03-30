import { Container, Divider, Footer, Header, MetaHeader } from '@components'
import { Slide } from '@components/Motion'
import type { BuildTime, PostMeta } from '@types'
import type { ReactNode } from 'react'

interface Props {
  banner: string
  posts: PostMeta[]
  buildTime: BuildTime
  children: ReactNode
}

function Layout({ banner, posts, buildTime, children }: Props): JSX.Element {
  return (
    <div className="dark:bg-black">
      <MetaHeader title={`${banner}`} />
      <Header posts={posts} />
      <Container className="min-h-screen px-6 pb-28 pt-0 md:pt-28">
        <Slide>
          <Divider>{banner}</Divider>
          {children}
        </Slide>
      </Container>
      <Footer buildTime={buildTime} />
    </div>
  )
}

export default Layout
