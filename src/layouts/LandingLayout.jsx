import React from 'react';
import { useSpring, animated } from 'react-spring';
import landingImage from '@images/landing.jpg';

const LandingLayout = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  return (
    <animated.div
      className="flex-col w-full h-screen p-0 m-0 overflow-x-hidden overflow-y-auto bg-center bg-no-repeat bg-cover text-light flex-container"
      style={{
        ...props,
        backgroundImage: `url("${landingImage}")`,
      }}
    >
      {children}
    </animated.div>
  );
};

export default LandingLayout;
