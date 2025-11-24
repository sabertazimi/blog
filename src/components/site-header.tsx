'use client'

import type { Metadata } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import CommandMenu from '@/components/command-menu'
import MainNav from '@/components/main-nav'
import MobileNav from '@/components/mobile-nav'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'

interface Props {
  metadata: Metadata
}

function Header({ metadata }: Props) {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-6">
        <div className="mr-4 flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label={siteConfig.title}>
              <Image src="/images/logo.svg" alt={siteConfig.title} width={24} height={24} priority />
            </Link>
          </Button>
        </div>
        <MainNav />
        <MobileNav />
        <div className="flex-1" />
        <div className="mr-2 hidden md:flex">
          <CommandMenu metadata={metadata} />
        </div>

        <div className="flex items-center">
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  )
}

export default Header
