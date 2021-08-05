import React from 'react';
import { usePostsMetadata } from '@hooks';
import { Header as PureHeader } from '@components';

const Header = (): JSX.Element => {
  const { posts } = usePostsMetadata();
  return <PureHeader posts={posts} />;
};

export default Header;
