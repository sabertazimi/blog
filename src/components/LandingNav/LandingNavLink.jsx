import React from 'react';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';
import * as styles from './LandingNav.module.css';

const LandingNavLink = ({ title, to, children }) => (
  <Tooltip placement="left" title={title}>
    <Link to={to}>
      <span
        className={`border-b-6 border-solid border-light text-light text-4xl md:text-7xl ${styles.landingNavLink}`}
      >
        {children}
      </span>
    </Link>
  </Tooltip>
);

export default LandingNavLink;
