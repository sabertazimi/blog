import { Fork, Hamburger } from '@components/Icons';
import { Switch } from '@components/Motion';
import { classNames } from '@components/utils';
import { routes as defaultRoutes } from '@config';
import type { Route } from '@types';
import { useCallback, useState } from 'react';
import LandingNavLink from './LandingNavLink';

interface Props {
  routes?: Route[];
}

const LandingNav = ({ routes = defaultRoutes }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded(expanded => !expanded);
  }, []);

  return (
    <>
      <Switch
        className={classNames(
          'fixed top-0 left-0 z-20',
          'flex flex-col items-center justify-center',
          'w-full h-full'
        )}
        role="navigation"
        open={expanded}
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
      </Switch>
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
          <Fork className="text-lg font-extrabold md:text-4xl text-light" />
        ) : (
          <Hamburger className="text-lg font-extrabold md:text-4xl text-light" />
        )}
      </div>
      <Switch
        className={classNames(
          'fixed top-0 left-0 z-10',
          'block w-full h-full',
          'bg-black'
        )}
        role="banner"
        open={expanded}
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
