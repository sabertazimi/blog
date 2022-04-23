import landingImage from '@images/landing.jpg';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

const LandingLayout = ({ children }: Props): JSX.Element => (
  <div
    className={classNames(
      'flex-col w-full h-screen p-0 m-0 overflow-x-hidden overflow-y-auto',
      'bg-center bg-no-repeat bg-cover text-light ',
      'flex-container'
    )}
    style={{
      backgroundImage: `url("${landingImage.src}")`,
    }}
  >
    {children}
  </div>
);

export default LandingLayout;
