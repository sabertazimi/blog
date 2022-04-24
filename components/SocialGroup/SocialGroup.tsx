import { SocialButton } from '@components';
import type { Color, SocialType } from '@config';
import { Colors, SocialList, SocialQuery } from '@config';
import { Space } from 'antd';
import React from 'react';

interface Props {
  url: string;
}

const SocialGroup = ({ url }: Props): JSX.Element => (
  <Space
    className="fixed left-0  top-1/2 z-10 hidden md:visible md:inline-flex"
    direction="vertical"
    align="center"
    size={0}
  >
    {Object.keys(SocialList)
      .filter(social => social !== SocialList.github)
      .map(social => (
        <SocialButton
          key={social}
          type={social as SocialType}
          url={`${SocialQuery[social as SocialType]}${url}`}
          color={Colors[social as Color]}
        />
      ))}
  </Space>
);

export default SocialGroup;
