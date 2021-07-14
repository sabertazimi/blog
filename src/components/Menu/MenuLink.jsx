import React from 'react';
import { Link } from 'gatsby';
import { Tooltip } from 'antd';
import { useResponsive } from '@hooks';
import { BreakPoints, Colors } from '@config';
import * as styles from './Menu.module.css';

const MenuLink = ({ title, to, children }) => {
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });

  return (
    <Tooltip placement="left" title={title}>
      <Link to={to}>
        <span
          className={styles.menuLink}
          style={{
            borderBottom: `5px solid ${Colors.light}`,
            fontSize: isMobile ? '2rem' : '4rem',
            color: Colors.light,
          }}
        >
          {children}
        </span>
      </Link>
    </Tooltip>
  );
};

export default MenuLink;
