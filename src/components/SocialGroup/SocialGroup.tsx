import { SocialButton } from '@components';
import { Color, Colors, SocialList, SocialQuery, SocialType } from '@config';
import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';

interface Props {
  url: string;
}

const SocialGroup = ({ url }: Props): JSX.Element => (
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
    {Object.keys(SocialList)
      .filter((social) => social !== SocialList.github)
      .map((social) => (
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
