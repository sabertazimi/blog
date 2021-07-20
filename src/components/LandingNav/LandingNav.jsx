import React, { useState, useCallback } from 'react';
import { Routes } from '@config';
import Icons from '@components/Icons';
import LandingNavLink from './LandingNavLink';
import * as styles from './LandingNav.module.css';

const LandingNav = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, []);

  return (
    <React.Fragment>
      <nav
        className={styles.landingNav}
        style={{
          transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {Routes.map((route) => (
          <LandingNavLink key={route.id} title={route.title} to={route.path}>
            {route.name}
          </LandingNavLink>
        ))}
      </nav>
      <div
        role="button"
        tabIndex="0"
        className={styles.hamburger}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        {expanded ? (
          <Icons.Close className="text-lg font-extrabold md:text-4xl text-light" />
        ) : (
          <Icons.Hamburger className="text-lg font-extrabold md:text-4xl text-light" />
        )}
      </div>
      <div
        className={
          expanded
            ? `bg-black bg-opacity-80 ${styles.overlay}`
            : `bg-black bg-opacity-0 ${styles.overlay}`
        }
      />
    </React.Fragment>
  );
};

export default LandingNav;
