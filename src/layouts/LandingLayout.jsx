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
        padding: 0,
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #6bafd2 0%, #a4c8dc 38%, #d6cbca 58%, #eabc96 79%, #db8876 100%)',
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
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          color: '#fff',
        }}
      >
        {children}
      </animated.div>
    </Segment>
  );
};

export default LandingLayout;
