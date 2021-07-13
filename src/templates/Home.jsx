import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '@/hooks';
import { LandingLayout } from '@/layouts';
import { Menu, TypingTitle, ErrorBoundary } from '@/components';

const Home = () => {
  const { siteUrl, title } = useSiteMetadata();

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
          titles={["I'm a CS student.", "I'm a coder.", "I'm a learner."]}
          style={{ padding: '3em 0', height: 'auto' }}
        />
        <Menu />
      </LandingLayout>
    </div>
  );
};

export default Home;
