import React from 'react';
import { Helmet } from 'react-helmet';
import { LandingLayout } from 'layouts';
import { IconBanner, TypingTitle, ErrorBoundary } from 'components';
import { MetaData } from 'config';

export default () => (
  <div>
    <ErrorBoundary>
      <Helmet key={MetaData.url}>
        <meta charSet="utf-8" />
        <title>{MetaData.title}</title>
        <link rel="canonical" href={MetaData.url} />
      </Helmet>
    </ErrorBoundary>
    <LandingLayout>
      <TypingTitle
        titles={["I'm a CS student.", "I'm a coder.", "I'm a learner."]}
        style={{ padding: '3em 0', height: 'auto' }}
      />
      <IconBanner />
    </LandingLayout>
  </div>
);
