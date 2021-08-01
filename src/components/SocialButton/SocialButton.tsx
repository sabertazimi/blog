import React from 'react';
import { Button } from 'antd';
import { SocialIcon } from '@components/Icons';

const SocialButton = ({ type, url, color, className = '', ...props }) => (
  <Button
    className={`text-center text-light rounded-none ${className}`}
    style={{ backgroundColor: color }}
    size="large"
    type="link"
    href={`${url}`}
    icon={SocialIcon(type)}
    {...props}
  />
);

export default SocialButton;
