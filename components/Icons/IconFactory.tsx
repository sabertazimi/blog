import type { KeyboardEvent, SVGProps } from 'react'
import Icon from '@ant-design/icons'

interface Props {
  onClick?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLSpanElement>) => void
  className?: string
}

type IconType = (props: Props) => JSX.Element

function IconFactory(svg: (props: SVGProps<SVGSVGElement>) => JSX.Element, ariaLabel: string): IconType {
  const IconComponent = ({
    onClick,
    onKeyDown,
    className,
    ...props
  }: Props): JSX.Element => (
    <Icon
      {...props}
      component={svg}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={className}
    />
  )

  return IconComponent
}

export default IconFactory
