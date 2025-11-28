'use client'

import type { ButtonProps } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonProps['size']
  iconClassName?: string
  duration?: number
}

export function AnimatedThemeToggler({
  className,
  size = 'icon',
  iconClassName,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) {
      return
    }

    await document.startViewTransition(() => {
      // eslint-disable-next-line react-dom/no-flush-sync -- theme switch should be synchronous
      flushSync(() => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }, [duration, resolvedTheme, setTheme])

  if (!mounted) {
    return null
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size={size}
      className={cn('cursor-pointer', className)}
      // eslint-disable-next-line ts/no-misused-promises -- toggleTheme is a valid promise
      onClick={toggleTheme}
      {...props}
    >
      {resolvedTheme === 'dark'
        ? (
            <MoonIcon className={cn('size-6', iconClassName)} />
          )
        : (
            <SunIcon className={cn('size-6', iconClassName)} />
          )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
