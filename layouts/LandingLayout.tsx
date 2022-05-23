import { MetaHeader } from '@components';
import { cx } from '@components/utils';
import landingImage from '@images/landing.jpg';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const LandingLayout = ({ children }: Props): JSX.Element => (
  <div>
    <MetaHeader />
    <div
      className={cx(
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
  </div>
);

export default LandingLayout;
