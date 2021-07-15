import React from 'react';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';
import { Colors } from '@config';
import * as styles from './LandingNav.module.css';

const LandingNavLink = ({ title, to, children }) => (
  <Tooltip placement="left" title={title}>
    <Link to={to}>
      <span
        className={`text-4xl md:text-7xl ${styles.landingNavLink}`}
        style={{
          borderBottom: `5px solid ${Colors.light}`,
          color: Colors.light,
        }}
      >
        {children}
      </span>
    </Link>
  </Tooltip>
);

export default LandingNavLink;
