'use client'

import { useRouter } from '@bprogress/next'
import { LanguagesIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigationRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getLocale } from '@/i18n/utils'

const localeNames: Record<string, { flag: string, name: string }> = {
  'en-US': { flag: '🇺🇸', name: 'English' },
  'zh-CN': { flag: '🇨🇳', name: '中文' },
}

function LanguageSwitcher() {
  const router = useRouter({ customRouter: useNavigationRouter })
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations('common')

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) {
      return
    }

    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPathname, { locale: getLocale(newLocale) })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('selectLanguage')} className="shrink-0">
          <LanguagesIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel inset>{t('selectLanguage')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={handleLocaleChange} value={currentLocale}>
          {routing.locales.map((locale) => {
            const { flag, name } = localeNames[locale] ?? { flag: '🌐', name: locale }
            return (
              <DropdownMenuRadioItem key={locale} value={locale}>
                <span className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span>{name}</span>
                </span>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
