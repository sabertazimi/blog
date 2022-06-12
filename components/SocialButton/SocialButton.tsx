import Button from '@components/Button';
import { SocialIcon } from '@components/Icons';
import { Bounce } from '@components/Motion';
import { cx } from '@components/utils';
import type { SocialType } from '@types';
import type { HTMLProps } from 'react';
import styles from './SocialButton.module.css';

interface Props extends HTMLProps<HTMLButtonElement> {
  type: SocialType;
  url: string;
  className?: string;
  color?: string;
}

const SocialButton = ({
  type,
  url,
  className,
  color = '',
}: Props): JSX.Element => (
  <Bounce>
    <Button
      role="link"
      size="large"
      type="link"
      className={cx(styles.button, className)}
      style={color ? { backgroundColor: color } : {}}
      icon={SocialIcon(type)}
      href={`${url}`}
    />
  </Bounce>
);

export default SocialButton;
