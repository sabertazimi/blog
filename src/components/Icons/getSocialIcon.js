import React from 'react';
import {
  RocketOutlined,
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import { SocialType } from '@config';

const getSocialIcon = (type, size = '2em') => {
  switch (type) {
    case SocialType.github:
      return <GithubOutlined style={{ fontSize: size }} />;
    case SocialType.twitter:
      return <TwitterOutlined style={{ fontSize: size }} />;
    case SocialType.facebook:
      return <FacebookOutlined style={{ fontSize: size }} />;
    case SocialType.linkedin:
      return <LinkedinOutlined style={{ fontSize: size }} />;
    case SocialType.weibo:
      return <WeiboOutlined style={{ fontSize: size }} />;
    default:
      return <RocketOutlined style={{ fontSize: size }} />;
  }
};

export default getSocialIcon;
