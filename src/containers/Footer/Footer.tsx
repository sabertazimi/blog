import React from 'react';
import { useBuildTime, useSiteMetadata } from '@hooks';
import { Footer as PureFooter } from '@components';

const Footer = (): JSX.Element => {
  const buildTime = useBuildTime();
  const { author, socialList } = useSiteMetadata();

  return (
    <PureFooter buildTime={buildTime} author={author} socialList={socialList} />
  );
};

export default Footer;
