import { Tooltip } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  title: string;
  href: string;
  children: ReactNode;
}

const LandingNavLink = ({ title, href, children }: Props): JSX.Element => (
  <Tooltip className="mb-16" placement="left" title={title}>
    <span
      className={classNames(
        'block px-0 pt-0 pb-3 mx-6 my-0 border-solid border-b-6 border-light',
        'text-4xl font-extrabold leading-none cursor-pointer text-light md:text-7xl',
        'transition-all transform-gpu scale-100 opacity-80 hover:opacity-100 hover:scale-110'
      )}
      role="link"
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </span>
  </Tooltip>
);

export default LandingNavLink;
