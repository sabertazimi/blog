import React, { useState, useRef, useCallback } from 'react';
import { PostMetaType } from '@types';
import { useVisibility } from '@hooks';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

interface Props {
  posts: PostMetaType[];
}

const Header = ({ posts }: Props): JSX.Element => {
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
      <DesktopNav fixed={navFixed} posts={posts} />
    </div>
  );
};

export default Header;
