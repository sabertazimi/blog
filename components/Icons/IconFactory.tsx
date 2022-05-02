import Icon from '@ant-design/icons';
import type { SVGProps } from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
}

type IconType = (props: Props) => JSX.Element;

const IconFactory = (
  svg: (props: SVGProps<SVGSVGElement>) => JSX.Element,
  ariaLabel: string
): IconType => {
  const IconComponent = ({
    onClick,
    className,
    ...props
  }: Props): JSX.Element => (
    <Icon
      {...props}
      component={svg}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
    />
  );

  return IconComponent;
};

export default IconFactory;
