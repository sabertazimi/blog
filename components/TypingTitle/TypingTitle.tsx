import { cx } from '@components/utils'
import { siteConfig } from '@config'
import { useTypingEffect } from '@hooks'
import { useRef } from 'react'

interface Props {
  titles?: string[]
  speed?: number
  delay?: number
  loop?: boolean
  className?: string
}

function TypingTitle({
  titles = siteConfig.landingTitles,
  speed = 60,
  delay = 600,
  loop = true,
  className,
}: Props): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  useTypingEffect(ref, { titles, speed, delay, loop })

  return (
    <div
      className={cx(
        'typing-title-container mx-auto my-0 h-auto w-full px-0 py-0',
        'text-center text-5xl font-extrabold lg:text-9xl',
        className,
      )}
    >
      <span role="main" ref={ref} />
    </div>
  )
}

export default TypingTitle
