import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Segment } from 'semantic-ui-react';

const LandingLayout = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  return (
    <Segment
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        color: '#fff',
      }}
      vertical
    >
      <animated.div
        style={{
          ...props,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {children}
      </animated.div>
    </Segment>
  );
};

export default LandingLayout;
