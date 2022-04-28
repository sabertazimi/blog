import Button from '@components/Button';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  onClick?: () => void;
}

const IconButton = ({ icon, onClick }: Props): JSX.Element => (
  <Button
    size="large"
    shape="circle"
    className="button-primary"
    icon={icon}
    onClick={onClick}
  />
);

export default IconButton;
