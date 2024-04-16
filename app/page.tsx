import { LandingNav, TypingTitle } from '@components'
import { LandingLayout } from '@layouts'
import type { Metadata, Viewport } from 'next'
import { getMetadata, getViewport } from '@config'

export function generateMetadata(): Metadata {
  return getMetadata()
}

export function generateViewport(): Viewport {
  return getViewport()
}

function Home(): JSX.Element {
  return (
    <LandingLayout>
      <LandingNav />
      <TypingTitle />
    </LandingLayout>
  )
}

export default Home
