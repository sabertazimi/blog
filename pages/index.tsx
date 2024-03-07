import { LandingNav, TypingTitle } from '@components'
import { LandingLayout } from '@layouts'

const Home = (): JSX.Element => (
  <LandingLayout>
    <LandingNav />
    <TypingTitle />
  </LandingLayout>
)

export default Home
