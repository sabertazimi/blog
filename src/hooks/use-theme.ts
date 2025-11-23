'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const updateTheme = () => {
      if (typeof window === 'undefined') {
        return
      }

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

  return theme
}
