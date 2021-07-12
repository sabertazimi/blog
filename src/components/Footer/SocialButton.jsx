import React from 'react';
import { Button } from 'antd';
import {
  RocketOutlined,
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import { SocialType, Colors } from '@/config';

const getSocialIcon = (type) => {
  switch (type) {
    case SocialType.GitHub:
      return <GithubOutlined style={{ fontSize: '2em' }} />;
    case SocialType.Twitter:
      return <TwitterOutlined style={{ fontSize: '2em' }} />;
    case SocialType.Facebook:
      return <FacebookOutlined style={{ fontSize: '2em' }} />;
    case SocialType.Weibo:
      return <WeiboOutlined style={{ fontSize: '2em' }} />;
    default:
      return <RocketOutlined style={{ fontSize: '2em' }} />;
  }
};

const SocialButton = ({ type, url }) => (
  <Button
    size="large"
    shape="circle"
    type="link"
    href={`${url}`}
    icon={getSocialIcon(type)}
    style={{
      margin: '0 1.5em 1em',
      color: Colors.white,
    }}
  />
);

export default SocialButton;
