import React, { useState, useRef, useCallback } from 'react';
import { useVisibility } from '@hooks';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = () => {
  const [navFixed, setNavFixed] = useState(false);
  const headerRef = useRef();

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
      <MobileNav className="md:hidden" />
      <DesktopNav className="hidden md:visible md:flex" fixed={navFixed} />
    </div>
  );
};

export default Header;
