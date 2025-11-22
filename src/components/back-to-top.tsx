'use client'

import type { ButtonProps } from '@/components/ui/button'
import { ArrowUpToLine } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => {
      setVisible(document.documentElement.scrollTop >= minHeight)
    }

    onScroll()
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, [])

  return (
    <Button
      variant="outline"
      onClick={() =>
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        })}
      className={cn(
        'fixed right-6 bottom-12 z-50 size-10 rounded-full transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      aria-hidden={!visible}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      {...props}
    >
      <ArrowUpToLine />
    </Button>
  )
}

export default BackToTop
