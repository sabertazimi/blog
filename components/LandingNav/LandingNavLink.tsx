import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  title: string;
  to: string;
  children: ReactNode;
}

const LandingNavLink = ({ to, children }: Props): JSX.Element => (
  <Link href={to}>
    <a
      className={classNames(
        'block px-0 pt-0 pb-3 mx-6 mb-16 border-solid border-b-6 border-light',
        'text-4xl font-extrabold leading-none cursor-pointer text-light md:text-7xl',
        'transition-all transform-gpu scale-100 opacity-80 hover:opacity-100 hover:scale-110'
      )}
    >
      {children}
    </a>
  </Link>
);

export default LandingNavLink;
