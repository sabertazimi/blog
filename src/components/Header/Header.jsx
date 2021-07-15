import React, { useState } from 'react';
import { Visibility, Segment } from 'semantic-ui-react';
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
      <Segment style={{ padding: 0 }} textAlign="center" vertical>
        {isMobile ? <MobileNav /> : <DesktopNav fixed={navFixed} />}
      </Segment>
    </Visibility>
  );
};

export default Header;
