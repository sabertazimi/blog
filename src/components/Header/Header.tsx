import React, { useState, useRef, useCallback } from 'react';
import { useVisibility } from '@hooks';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = (): JSX.Element => {
  const [navFixed, setNavFixed] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const hideFixedNav = useCallback(() => {
    setNavFixed(false);
  }, []);

  const showFixedNav = useCallback(() => {
    setNavFixed(true);
  }, []);

  useVisibility({
    ref: headerRef,
    onBottomPassed: showFixedNav,
    onBottomPassedReverse: hideFixedNav,
  });

  return (
    <div ref={headerRef}>
      <MobileNav />
      <DesktopNav fixed={navFixed} />
    </div>
  );
};

export default Header;
