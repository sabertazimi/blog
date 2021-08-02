import React from 'react';
import {
  RocketOutlined,
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import { SocialType, SocialList } from '@config';

const SocialIcon = (type: SocialType): JSX.Element => {
  switch (type) {
    case SocialList.github:
      return <GithubOutlined className="text-4xl" />;
    case SocialList.twitter:
      return <TwitterOutlined className="text-4xl" />;
    case SocialList.facebook:
      return <FacebookOutlined className="text-4xl" />;
    case SocialList.linkedin:
      return <LinkedinOutlined className="text-4xl" />;
    case SocialList.weibo:
      return <WeiboOutlined className="text-4xl" />;
    default:
      return <RocketOutlined className="text-4xl" />;
  }
};

export default SocialIcon;
