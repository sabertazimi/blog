import Button from '@components/Button';
import { SocialIcon } from '@components/Icons';
import { Bounce } from '@components/Motion';
import type { SocialType } from '@types';
import type { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  type: SocialType;
  url: string;
  color?: string;
  className?: string;
}

const SocialButton = ({
  type,
  url,
  color = '',
  className = '',
}: Props): JSX.Element => (
  <Bounce>
    <Button
      role="link"
      size="large"
      type="link"
      className={`text-center text-light rounded-none ${className}`}
      style={color ? { backgroundColor: color } : {}}
      icon={SocialIcon(type)}
      href={`${url}`}
    />
  </Bounce>
);

export default SocialButton;
