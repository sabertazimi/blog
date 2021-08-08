import { LandingNav, MetaHeader, TypingTitle } from '@components';
import { Routes } from '@config';
import { useSiteMetadata } from '@hooks';
import { LandingLayout } from '@layouts';
import React from 'react';

const Home = (): JSX.Element => {
  const { siteUrl, title, landingTitles } = useSiteMetadata();

  return (
    <div>
      <MetaHeader siteUrl={siteUrl} title={title} />
      <LandingLayout>
        <LandingNav routes={Routes} />
        <TypingTitle titles={landingTitles} />
      </LandingLayout>
    </div>
  );
};

export default Home;
