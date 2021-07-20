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

const getSocialIcon = (type) => {
  switch (type) {
    case SocialType.github:
      return <GithubOutlined className="text-4xl" />;
    case SocialType.twitter:
      return <TwitterOutlined className="text-4xl" />;
    case SocialType.facebook:
      return <FacebookOutlined className="text-4xl" />;
    case SocialType.linkedin:
      return <LinkedinOutlined className="text-4xl" />;
    case SocialType.weibo:
      return <WeiboOutlined className="text-4xl" />;
    default:
      return <RocketOutlined className="text-4xl" />;
  }
};

export default getSocialIcon;
