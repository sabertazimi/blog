import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Colors } from 'config';

const LandingLayout = ({ children, column = false }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        color: Colors.light,
      }}
    >
      <animated.div
        style={{
          ...props,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: column ? 'column' : 'row',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default LandingLayout;
