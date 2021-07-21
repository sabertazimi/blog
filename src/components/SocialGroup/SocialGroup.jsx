import React from 'react';
import classNames from 'classnames';
import { useLocation } from '@reach/router';
import { Space } from 'antd';
import { Colors, SocialType, SocialQuery } from '@config';
import SocialButton from '@components/SocialButton';

const SocialGroup = () => {
  const location = useLocation();
  const url = location.href;

  return (
    <Space
      className={classNames(
        'fixed left-0 top-1/2',
        'transition duration-300',
        '-translate-y-1/2 transform-gpu -translate-x-3/4',
        'hover:translate-x-0'
      )}
      direction="vertical"
      align="center"
      size={0}
    >
      {Object.keys(SocialType)
        .filter((social) => social !== SocialType.github)
        .map((social) => (
          <SocialButton
            key={social}
            type={social}
            url={`${SocialQuery[social]}${url}`}
            color={Colors[social]}
          />
        ))}
    </Space>
  );
};

export default SocialGroup;
