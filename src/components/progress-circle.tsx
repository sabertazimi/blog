import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface ProgressCircleProps extends Omit<ComponentProps<'svg'>, 'strokeWidth'> {
  value: number
  strokeWidth?: number
  size?: number
  min?: number
  max?: number
}

function clamp(input: number, min: number, max: number): number {
  return Math.min(Math.max(input, min), max)
}

function ProgressCircle({
  value,
  strokeWidth = 2,
  size = 24,
  min = 0,
  max = 100,
  className,
  ...restSvgProps
}: ProgressCircleProps) {
  const normalizedValue = clamp(value, min, max)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = ((normalizedValue - min) / (max - min)) * circumference
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: 'none',
    strokeWidth,
  }

  return (
    <svg
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
      aria-valuenow={normalizedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn('size-6', className)}
      {...restSvgProps}
    >
      <circle {...circleProps} className="stroke-current/25" />
      <circle
        {...circleProps}
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all"
      />
    </svg>
  )
}

export default ProgressCircle
