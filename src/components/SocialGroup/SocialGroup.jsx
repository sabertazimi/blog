import React from 'react';
import { useLocation } from '@reach/router';
import { Space } from 'antd';
import { Colors, SocialType, SocialQuery } from '@config';
import SocialButton from '@components/SocialButton';
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
      {Object.keys(SocialType)
        .filter((social) => social !== SocialType.github)
        .map((social) => (
          <SocialButton
            key={social}
            type={social}
            url={`${SocialQuery[social]}${url}`}
            style={{
              backgroundColor: Colors[social],
            }}
          />
        ))}
    </Space>
  );
};

export default SocialGroup;
