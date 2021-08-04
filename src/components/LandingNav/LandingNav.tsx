import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { RouteType } from '@config';
import { Close, Hamburger } from '@components/Icons';
import LandingNavLink from './LandingNavLink';

interface Props {
  routes: RouteType[];
}

const LandingNav = ({ routes }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, []);

  return (
    <React.Fragment>
      <nav
        className={classNames(
          'fixed top-0 left-0',
          'flex flex-col items-center justify-center',
          'w-full h-full',
          'transition-all transform-gpu duration-500 z-100',
          {
            'translate-x-0': expanded,
            '-translate-x-full': !expanded,
          }
        )}
        role="navigation"
      >
        {routes.map((route) => (
          <LandingNavLink key={route.id} title={route.title} to={route.path}>
            {route.name}
          </LandingNavLink>
        ))}
      </nav>
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
      <div
        className={classNames(
          'fixed top-0 left-0 z-10',
          'block w-full h-full',
          'transition-all transform-gpu bg-black',
          {
            'bg-opacity-80': expanded,
            'bg-opacity-0': !expanded,
          }
        )}
        role="banner"
      />
    </React.Fragment>
  );
};

export default LandingNav;
