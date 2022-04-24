import { LandingNav, MetaHeader, TypingTitle } from '@components';
import { Routes } from '@config';
import { LandingLayout } from '@layouts';
import { getSiteConfig } from '@lib';
import type { SiteConfig } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteConfig = getSiteConfig();
  return {
    props: {
      siteConfig,
    },
  };
};

const Home = ({ siteConfig }: Props): JSX.Element => {
  const { siteUrl, title, landingTitles } = siteConfig;

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
