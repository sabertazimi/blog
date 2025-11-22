'use client'

import { useEffect, useRef, useState } from 'react'
import Disqus from '@/components/disqus'
import { siteConfig } from '@/lib/site'

interface PostCommentProps {
  url: string
  slug: string
}

export function PostComment({ url, slug }: PostCommentProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const currentTheme = isDark ? 'dark' : 'light'
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      setTheme(storedTheme || currentTheme)
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current)
      return

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
    <div ref={containerRef} className="comments">
      {isVisible && (
        <Disqus
          key={theme}
          shortname={siteConfig.disqusShortname}
          config={disqusConfig}
        />
      )}
    </div>
  )
}
