import React from 'react';
import { Button } from 'antd';
import Icons from '@components/Icons';

const SocialButton = ({ type, url, color, className = '', ...props }) => (
  <Button
    size="large"
    type="link"
    href={`${url}`}
    icon={Icons.getSocialIcon(type)}
    className={`text-center text-light rounded-none ${className}`}
    style={{ backgroundColor: color }}
    {...props}
  />
);

export default SocialButton;
