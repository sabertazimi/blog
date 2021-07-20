import React from 'react';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';

const LandingNavLink = ({ title = 'Tooltip', to = '/', children }) => (
  <Tooltip placement="left" title={title} className="mb-16">
    <Link to={to}>
      <span className="block px-0 pt-0 pb-3 mx-6 my-0 text-4xl font-extrabold leading-none transition-all scale-100 border-solid cursor-pointer border-b-6 border-light text-light md:text-7xl opacity-80 hover:opacity-100 hover:scale-110">
        {children}
      </span>
    </Link>
  </Tooltip>
);

export default LandingNavLink;
