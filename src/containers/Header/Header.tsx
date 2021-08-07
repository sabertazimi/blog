import { Header as PureHeader } from '@components';
import { usePostsMetadata } from '@hooks';
import React from 'react';

const Header = (): JSX.Element => {
  const { posts } = usePostsMetadata();
  return <PureHeader posts={posts} />;
};

export default Header;
