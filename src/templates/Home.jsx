import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '@hooks';
import { LandingLayout } from '@layouts';
import { LandingNav, TypingTitle, ErrorBoundary } from '@components';

const Home = () => {
  const { siteUrl, title, landingTitles } = useSiteMetadata();

  return (
    <div>
      <ErrorBoundary>
        <Helmet key={siteUrl}>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={siteUrl} />
        </Helmet>
      </ErrorBoundary>
      <LandingLayout>
        <TypingTitle
          titles={landingTitles}
          style={{ padding: '3em 0', height: 'auto' }}
        />
        <LandingNav />
      </LandingLayout>
    </div>
  );
};

export default Home;
