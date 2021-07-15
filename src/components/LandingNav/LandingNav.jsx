import React, { useState, useCallback } from 'react';
import { useResponsive } from '@hooks';
import { BreakPoints, Colors } from '@config';
import Icons from '@components/Icons';
import LandingNavLink from './LandingNavLink';
import * as styles from './LandingNav.module.css';

const LandingNav = ({ onExpand }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });

  const handleClick = useCallback(() => {
    if (onExpand) {
      onExpand(!expanded);
    }

    setExpanded((expanded) => !expanded);
  }, [expanded, onExpand]);

  return (
    <React.Fragment>
      <nav
        className={styles.landingNav}
        style={{
          transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <LandingNavLink title="View Posts" to="/posts">
          Posts
        </LandingNavLink>
        <LandingNavLink title="View Tags" to="/tags">
          Tags
        </LandingNavLink>
        <LandingNavLink title="View Books" to="/books">
          Books
        </LandingNavLink>
        <LandingNavLink title="About Me" to="/about">
          About
        </LandingNavLink>
      </nav>
      <div
        role="button"
        tabIndex="0"
        className={styles.hamburger}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        {expanded ? (
          <Icons.Close
            style={{
              fontWeight: 800,
              fontSize: isMobile ? '1rem' : '2rem',
              color: Colors.white,
            }}
          />
        ) : (
          <Icons.Hamburger
            style={{
              fontWeight: 800,
              fontSize: isMobile ? '1rem' : '2rem',
              color: Colors.white,
            }}
          />
        )}
      </div>
      <div
        className={styles.overlay}
        style={{
          backgroundColor: expanded ? Colors.overlay : Colors.transparent,
        }}
      />
    </React.Fragment>
  );
};

export default LandingNav;
