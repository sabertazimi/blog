import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Colors } from 'config';
import landingImage from 'images/landing.jpg';

const LandingLayout = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  return (
    <animated.div
      style={{
        ...props,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        background: `url("${landingImage}") center no-repeat`,
        backgroundSize: 'cover',
        color: Colors.light,
      }}
    >
      {children}
    </animated.div>
  );
};

export default LandingLayout;
