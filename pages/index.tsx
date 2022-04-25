import { LandingNav, TypingTitle } from '@components';
import { routes, siteConfig } from '@config';
import { LandingLayout } from '@layouts';

const Home = (): JSX.Element => (
  <LandingLayout>
    <LandingNav routes={routes} />
    <TypingTitle titles={siteConfig.landingTitles} />
  </LandingLayout>
);

export default Home;
