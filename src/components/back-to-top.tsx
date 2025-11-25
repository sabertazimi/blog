'use client'

import type { ButtonProps } from '@/components/ui/button'
import { ArrowUpToLineIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackToTopProps extends ButtonProps {
  /** minimum height to show the button */
  minHeight?: number
  /** height to scroll to */
  scrollTo?: number
}

function BackToTop({ minHeight = 300, scrollTo = 0, className, ...props }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('common')

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(document.documentElement.scrollTop >= minHeight)
          ticking = false
        })
        ticking = true
      }
    }

    setVisible(document.documentElement.scrollTop >= minHeight)
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, [])

  return (
    <Button
      variant="outline"
      size="icon-lg"
      onClick={() =>
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        })}
      className={cn(
        'fixed right-6 bottom-12 z-50 rounded-full transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      aria-hidden={!visible}
      aria-label={t('backToTop')}
      tabIndex={visible ? 0 : -1}
      {...props}
    >
      <ArrowUpToLineIcon />
    </Button>
  )
}

export default BackToTop
