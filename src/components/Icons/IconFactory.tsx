import Icon from '@ant-design/icons';
import React, { ComponentType, SVGProps } from 'react';

interface Props {
  className?: string;
}

type IconType = (props: Props) => JSX.Element;

const IconFactory = (svg: ComponentType<SVGProps<SVGSVGElement>>): IconType => {
  const IconComponent = ({ className }: Props): JSX.Element => (
    <Icon component={svg} className={className} />
  );
  return IconComponent;
};

export default IconFactory;
