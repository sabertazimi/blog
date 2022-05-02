import { Hamburger } from '@components/Icons';
import { Switch } from '@components/Motion';
import type { MotionProps } from '@components/utils';
import { routes as defaultRoutes } from '@config';
import type { Route } from '@types';
import { useCallback, useState } from 'react';
import styles from './LandingNav.module.css';
import LandingNavLink from './LandingNavLink';

interface Props {
  routes?: Route[];
}

const navVariants: MotionProps['variants'] = {
  open: {
    x: 0,
  },
  close: {
    x: '-100%',
  },
};

const navTransition: MotionProps['transition'] = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

const bannerVariants: MotionProps['variants'] = {
  open: {
    opacity: 0.8,
  },
  close: {
    opacity: 0,
  },
};

const bannerTransition: MotionProps['transition'] = {
  type: 'spring',
  duration: 0.2,
};

const LandingNav = ({ routes = defaultRoutes }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded(expanded => !expanded);
  }, []);

  return (
    <>
      <Hamburger
        onClick={handleToggle}
        className={styles.icon}
        data-testid="hamburger-button"
      />
      <Switch
        className={styles.nav}
        role="navigation"
        open={expanded}
        variants={navVariants}
        transition={navTransition}
      >
        {routes.map(route => (
          <LandingNavLink key={route.id} title={route.title} href={route.path}>
            {route.name}
          </LandingNavLink>
        ))}
      </Switch>
      <Switch
        className={styles.banner}
        role="banner"
        open={expanded}
        variants={bannerVariants}
        transition={bannerTransition}
      />
    </>
  );
};

export default LandingNav;
