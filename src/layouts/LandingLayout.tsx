import React from 'react';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';
// @TODO: Bug: images resolution in React TypeScript
import landingImage from '@images/landing.jpg';

interface Props {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: Props): JSX.Element => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  return (
    <animated.div
      className={classNames(
        'flex-col w-full h-screen p-0 m-0 overflow-x-hidden overflow-y-auto',
        'bg-center bg-no-repeat bg-cover text-light ',
        'flex-container'
      )}
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
