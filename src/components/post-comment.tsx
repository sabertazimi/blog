'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import Disqus from '@/components/disqus'
import { siteConfig } from '@/lib/site'

interface PostCommentProps {
  url: string
  slug: string
}

export function PostComment({ url, slug }: PostCommentProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  const disqusConfig = {
    identifier: slug,
    url,
  }

  return (
    <div ref={containerRef} data-testid="comments-container" className="comments">
      {mounted && isVisible && (
        <Disqus key={resolvedTheme} shortname={siteConfig.disqusShortname} config={disqusConfig} />
      )}
    </div>
  )
}
