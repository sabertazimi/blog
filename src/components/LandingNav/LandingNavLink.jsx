import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';

const LandingNavLink = ({ title = 'Tooltip', to = '/', children }) => (
  <Tooltip placement="left" title={title} className="mb-16">
    <Link to={to}>
      <span
        className={classNames(
          'block px-0 pt-0 pb-3 mx-6 my-0 border-solid border-b-6 border-light',
          'text-4xl font-extrabold leading-none cursor-pointer text-light md:text-7xl',
          'transition-all scale-100 opacity-80 hover:opacity-100 hover:scale-110'
        )}
      >
        {children}
      </span>
    </Link>
  </Tooltip>
);

export default LandingNavLink;
