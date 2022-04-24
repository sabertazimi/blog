import { SocialIcon } from '@components/Icons';
import { Bounce} from '@components/Motion';
import type { SocialType } from '@config';
import { Button } from 'antd';
import type { HTMLProps } from 'react';
import React from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  type: SocialType;
  url: string;
  color?: string;
  className?: string;
}

const SocialButton = ({
  type,
  url,
  color,
  className = '',
}: Props): JSX.Element => (
  <Bounce>
    <Button
      className={`text-center text-light rounded-none ${className}`}
      role="link"
      size="large"
      type="link"
      href={`${url}`}
      icon={SocialIcon(type)}
      style={{ backgroundColor: color || '' }}
    />
  </Bounce>
);

export default SocialButton;
