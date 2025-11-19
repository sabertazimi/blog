'use client'

import type { PostMeta } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import CommandMenu from '@/components/command-menu'
import MainNav from '@/components/main-nav'
import MobileNav from '@/components/mobile-nav'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

interface Props {
  posts: PostMeta[]
}

function Header({ posts }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-2">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label={siteConfig.title}>
              <Image
                src="/images/logo.svg"
                alt={siteConfig.title}
                width={24}
                height={24}
                priority
              />
            </Link>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <MainNav />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Spacer for desktop */}
        <div className="hidden flex-1 md:flex" />

        {/* Command Menu */}
        <CommandMenu posts={posts} />

        {/* Theme Toggler */}
        <div className="flex items-center">
          <AnimatedThemeToggler
            className={cn(
              'size-9 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
              'inline-flex items-center justify-center',
            )}
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
