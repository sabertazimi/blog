import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Tooltip, Icon } from 'antd';
import { Icons } from 'components';
import IconBannerLink from './IconBannerLink';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';
import styles from './IconBanner.module.css';

const IconBanner = ({ onExpand }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });
  const handleClick = () => {
    if (onExpand) {
      onExpand(!expanded);
    }

    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <nav
        className={styles.iconBanner}
        style={{
          transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <IconBannerLink title="View Posts" to="/posts">
          Posts
        </IconBannerLink>

        <IconBannerLink title="View Tags" to="/tags">
          Tags
        </IconBannerLink>

        <IconBannerLink title="View Books" to="/books">
          Books
        </IconBannerLink>

        <IconBannerLink title="About Me" to="/about">
          About
        </IconBannerLink>
      </nav>
      <div className={styles.hamburger} onClick={handleClick}>
        <Icons.Hamburger
          style={{
            fontWeight: 800,
            fontSize: isMobile ? '1rem' : '2rem',
          }}
        />
      </div>
      <div
        className={styles.overlay}
        style={{
          backgroundColor: expanded ? Colors.overlay : Colors.transparent,
        }}
      />
      <canvas id="bubble" />
    </React.Fragment>
  );
};

export default IconBanner;
