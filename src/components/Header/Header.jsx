import React, { useState } from 'react';
import { Visibility, Segment } from 'semantic-ui-react';
import { useResponsive } from '@hooks';
import { BreakPoints } from '@config';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Header = () => {
  const [navFixed, setNavFixed] = useState(false);
  const isNotMobile = useResponsive({ minWidth: BreakPoints.mobile });

  const hideFixedNav = () => setNavFixed(false);
  const showFixedNav = () => setNavFixed(true);

  return (
    <Visibility
      onBottomPassed={showFixedNav}
      onBottomPassedReverse={hideFixedNav}
      once={false}
    >
      <Segment style={{ padding: 0 }} textAlign="center" vertical>
        {isNotMobile ? <DesktopNav fixed={navFixed} /> : <MobileNav />}
      </Segment>
    </Visibility>
  );
};

export default Header;
