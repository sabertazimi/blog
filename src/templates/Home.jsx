import React from 'react';
import { Helmet } from 'react-helmet';
import { LandingLayout } from '../layouts';
import { IconBanner, TypingTitle } from '../components';

export default () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sabertazimi's Blog</title>
      <link rel="canonical" href="http://sabertazimi.github.io" />
    </Helmet>
    <LandingLayout>
      <TypingTitle
        titles={["I'm a CS student.", "I'm a coder.", "I'm a learner"]}
        style={{ padding: '3em', height: 'auto' }}
      />
      <IconBanner />
    </LandingLayout>
  </div>
);
