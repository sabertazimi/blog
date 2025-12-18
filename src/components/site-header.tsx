import type { Metadata } from '@/types'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { CommandMenu } from '@/components/command-menu'
import { LanguageSwitcher } from '@/components/language-switcher'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface Props {
  metadata: Metadata
}

export function SiteHeader({ metadata }: Props) {
  const t = useTranslations('site')
  const siteTitle = t('title')

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-6">
        <div className="mr-4 flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label={siteTitle}>
              <Image src="/images/logo.svg" alt={siteTitle} width={24} height={24} priority />
            </Link>
          </Button>
        </div>
        <MainNav />
        <MobileNav />
        <div className="flex-1" />
        <div className="flex items-center gap-2 md:gap-4">
          <CommandMenu metadata={metadata} />
          <LanguageSwitcher />
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  )
}
