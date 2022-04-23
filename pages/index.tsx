import { LandingNav, MetaHeader, TypingTitle } from '@components';
import { Routes } from '@config';
import { LandingLayout } from '@layouts';
import { getSiteMetadata } from '@lib';
import type { SiteMetadata } from '@types';
import type { GetStaticProps } from 'next/types';
import React from 'react';

interface Props {
  siteMetadata: SiteMetadata;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      siteMetadata,
    },
  };
};

const Home = ({ siteMetadata }: Props): JSX.Element => {
  const { siteUrl, title, landingTitles } = siteMetadata;

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
