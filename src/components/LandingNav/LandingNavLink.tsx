import { Tooltip } from 'antd';
import classNames from 'classnames';
import { Link } from 'gatsby';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  title: string;
  to: string;
  children: ReactNode;
}

const LandingNavLink = ({ title, to, children }: Props): JSX.Element => (
  <Tooltip className="mb-16" placement="left" title={title}>
    <Link to={to} role="link">
      <span
        className={classNames(
          'block px-0 pt-0 pb-3 mx-6 my-0 border-solid border-b-6 border-light',
          'text-4xl font-extrabold leading-none cursor-pointer text-light md:text-7xl',
          'transition-all transform-gpu scale-100 opacity-80 hover:opacity-100 hover:scale-110'
        )}
      >
        {children}
      </span>
    </Link>
  </Tooltip>
);

export default LandingNavLink;
