import { Footer as PureFooter } from '@components';
import { useBuildTime, useSiteMetadata } from '@hooks';
import React from 'react';

const Footer = (): JSX.Element => {
  const buildTime = useBuildTime();
  const { author, socialList } = useSiteMetadata();

  return (
    <PureFooter buildTime={buildTime} author={author} socialList={socialList} />
  );
};

export default Footer;
