import React from 'react';
import { useLocation } from '@reach/router';
import { Space } from 'antd';
import SocialButton from '@/components/SocialButton';
import { Colors, SocialType, SocialQuery } from '@/config';
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
        url={`${SocialQuery.twitter}${url}`}
        style={{
          backgroundColor: Colors.twitter,
        }}
      />
      <SocialButton
        color={Colors.facebook}
        type={SocialType.facebook}
        url={`${SocialQuery.facebook}${url}`}
        style={{
          backgroundColor: Colors.facebook,
        }}
      />
      <SocialButton
        color={Colors.weibo}
        type={SocialType.weibo}
        url={`${SocialQuery.weibo}${url}`}
        style={{
          backgroundColor: Colors.weibo,
        }}
      />
      <SocialButton
        color={Colors.linkedin}
        type={SocialType.linkedin}
        url={`${SocialQuery.linkedin}${url}`}
        style={{
          backgroundColor: Colors.linkedin,
        }}
      />
    </Space>
  );
};

export default SocialGroup;
