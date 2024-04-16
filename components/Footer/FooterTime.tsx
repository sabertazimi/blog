'use client'

import type { BuildTime } from '@/types'

interface Props {
  buildTime: BuildTime
}

export default function FooterTime({ buildTime }: Props) {
  return (
    <span>
      Last Build Time
      {' '}
      <a href="https://github.com/sabertazimi/blog/actions">
        <time
          dateTime={new Date(buildTime).toLocaleString('zh-CN', { hour12: false })}
        >
          {new Date(buildTime).toLocaleString('zh-CN', { hour12: false })}
        </time>
      </a>
    </span>

  )
}
