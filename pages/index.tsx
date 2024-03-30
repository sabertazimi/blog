import { LandingNav, TypingTitle } from '@components'
import { LandingLayout } from '@layouts'

function Home(): JSX.Element {
  return (
    <LandingLayout>
      <LandingNav />
      <TypingTitle />
    </LandingLayout>
  )
}

export default Home
