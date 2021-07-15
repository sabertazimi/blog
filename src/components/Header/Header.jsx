import React, { useState } from 'react';
import { Visibility } from 'semantic-ui-react';
import { useResponsive } from '@hooks';
import { BreakPoints } from '@config';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = () => {
  const [navFixed, setNavFixed] = useState(false);
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });

  const hideFixedNav = () => setNavFixed(false);
  const showFixedNav = () => setNavFixed(true);

  return (
    <Visibility
      onBottomPassed={showFixedNav}
      onBottomPassedReverse={hideFixedNav}
      once={false}
    >
      {isMobile ? <MobileNav /> : <DesktopNav fixed={navFixed} />}
    </Visibility>
  );
};

export default Header;
