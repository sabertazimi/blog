import React from 'react';
import { Button } from 'antd';
import { Colors } from '@/config';
import Icons from '@/components/Icons';

const SocialButton = ({ type, url, style, ...props }) => (
  <Button
    size="large"
    type="link"
    href={`${url}`}
    icon={Icons.getSocialIcon(type)}
    style={{
      borderRadius: '0px',
      textAlign: 'center',
      color: Colors.white,
      ...style,
    }}
    {...props}
  />
);

export default SocialButton;
