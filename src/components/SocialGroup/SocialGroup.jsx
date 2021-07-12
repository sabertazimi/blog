import React from 'react';
import { useLocation } from '@reach/router';
import { Space } from 'antd';
import SocialButton from '@/components/SocialButton';
import { Colors, SocialType, SocialShare } from '@/config';
import * as styles from './SocialGroup.module.css';

const SocialGroup = () => {
  const location = useLocation();
  const url = location.href;

  return (
    <Space
      direction="vertical"
      align="center"
      size={0}
      className={styles.socialGroup}
    >
      <SocialButton
        type={SocialType.twitter}
        url={`${SocialShare.twitter}${url}`}
        style={{
          backgroundColor: Colors.twitter,
        }}
      />
      <SocialButton
        color={Colors.facebook}
        type={SocialType.facebook}
        url={`${SocialShare.facebook}${url}`}
        style={{
          backgroundColor: Colors.facebook,
        }}
      />
      <SocialButton
        color={Colors.weibo}
        type={SocialType.weibo}
        url={`${SocialShare.weibo}${url}`}
        style={{
          backgroundColor: Colors.weibo,
        }}
      />
      <SocialButton
        color={Colors.linkedin}
        type={SocialType.linkedin}
        url={`${SocialShare.linkedin}${url}`}
        style={{
          backgroundColor: Colors.linkedin,
        }}
      />
    </Space>
  );
};

export default SocialGroup;
