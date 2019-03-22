import React from 'react';
import { Helmet } from 'react-helmet';
import { LandingLayout, LandingPanel } from '../layouts';
import { IconBanner, TypingTitle } from '../components';
import landingImage from '../images/landing.jpg';

export default () => {
  console.log(landingImage);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sabertazimi's Blog</title>
        <link rel="canonical" href="https://tazimi.dev" />
      </Helmet>
      <LandingLayout>
        <LandingPanel
          style={{
            width: '70%',
            background: `url("${landingImage}") center no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <TypingTitle
            titles={["I'm a CS student.", "I'm a coder.", "I'm a learner."]}
            style={{ padding: '3em 0', height: 'auto' }}
          />
        </LandingPanel>
        <LandingPanel
          style={{
            flexShrink: '0',
            width: '300px',
            minWidth: '300px',
            boxShadow: '-20px 0 60px 0 rgba(0, 0, 0, 0.3)',
          }}
        >
          <IconBanner />
        </LandingPanel>
      </LandingLayout>
    </div>
  );
};
