import type { CSSProperties } from 'react'
import type { BuildTime } from '@/types'
import { useTranslations } from 'next-intl'
import { FormattedDate } from '@/components/formatted-date'
import { siteConfig } from '@/lib/site'
import { socialLinks } from '@/lib/social'
import { cn } from '@/lib/utils'

interface Props {
  buildTime: BuildTime
}

export function SiteFooter({ buildTime }: Props) {
  const t = useTranslations('footer')

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between px-6 py-8 lg:px-0">
        <div className="flex items-center justify-center gap-4">
          {Object.entries(socialLinks).map(([name, social]) => (
            <a
              key={name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'dark:hover:text-primary text-muted-foreground transition-colors hover:text-(--social-color)',
                'inline-flex items-center justify-center',
              )}
              style={{
                ['--social-color' as keyof CSSProperties]: social.color,
              }}
              aria-label={social.name}
            >
              <social.icon className="size-5" />
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <div className="text-muted-foreground text-sm">
            {t('copyright')}
            {' © '}
            {new Date().getFullYear()}
            {' '}
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
            >
              {siteConfig.author}
            </a>
          </div>
          <span className="text-muted-foreground text-sm">
            {t('lastBuilt')}
            {' '}
            <a
              href="https://github.com/sabertazimi/blog/actions"
              className="hover:text-primary decoration-muted-foreground/30 underline underline-offset-4 transition-colors hover:decoration-current"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedDate date={buildTime} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
