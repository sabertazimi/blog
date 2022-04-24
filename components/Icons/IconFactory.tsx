import Icon from '@ant-design/icons';
import type { ComponentType, SVGProps } from 'react';

interface Props {
  className?: string;
}

type IconType = (props: Props) => JSX.Element;

const IconFactory = (
  svg: ComponentType<SVGProps<SVGSVGElement>>,
  ariaLabel: string
): IconType => {
  const IconComponent = ({ className }: Props): JSX.Element => (
    <Icon component={svg} className={className} aria-label={ariaLabel} />
  );
  return IconComponent;
};

export default IconFactory;
