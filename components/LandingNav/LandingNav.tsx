import { Close, Hamburger } from '@components/Icons';
import type { Route } from '@types';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import LandingNavLink from './LandingNavLink';

interface Props {
  routes: Route[];
}

const LandingNav = ({ routes }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded(expanded => !expanded);
  }, []);

  return (
    <>
      <motion.nav
        className={classNames(
          'fixed top-0 left-0 z-20',
          'flex flex-col items-center justify-center',
          'w-full h-full'
        )}
        role="navigation"
        layout
        animate={expanded ? 'open' : 'close'}
        variants={{
          open: {
            x: 0,
          },
          close: {
            x: '-100%',
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.4,
        }}
      >
        {routes.map(route => (
          <LandingNavLink key={route.id} title={route.title} href={route.path}>
            {route.name}
          </LandingNavLink>
        ))}
      </motion.nav>
      <div
        className={classNames(
          'fixed bg-transparent border-none',
          'cursor-pointer top-12 left-12 z-100'
        )}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleClick}
      >
        {expanded ? (
          <Close className="text-lg font-extrabold md:text-4xl text-light" />
        ) : (
          <Hamburger className="text-lg font-extrabold md:text-4xl text-light" />
        )}
      </div>
      <motion.div
        className={classNames(
          'fixed top-0 left-0 z-10',
          'block w-full h-full',
          'transition-all transform-gpu bg-black'
        )}
        role="banner"
        layout
        animate={expanded ? 'open' : 'close'}
        variants={{
          open: {
            opacity: 0.8,
          },
          close: {
            opacity: 0,
          },
        }}
        transition={{
          type: 'spring',
          duration: 0.2,
        }}
      />
    </>
  );
};

export default LandingNav;
