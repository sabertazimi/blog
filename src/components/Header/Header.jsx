import React, { useState } from 'react';
import { Visibility } from 'semantic-ui-react';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = () => {
  const [navFixed, setNavFixed] = useState(false);

  const hideFixedNav = () => setNavFixed(false);
  const showFixedNav = () => setNavFixed(true);

  return (
    <Visibility
      onBottomPassed={showFixedNav}
      onBottomPassedReverse={hideFixedNav}
      once={false}
    >
      <MobileNav className="md:hidden" />
      <DesktopNav className="hidden md:visible md:flex" fixed={navFixed} />
    </Visibility>
  );
};

export default Header;
