import { getTranslations } from 'next-intl/server'
import * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { GravityStarsBackground } from '@/components/ui/gravity-stars'
import { MorphingText } from '@/components/ui/morphing-text'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@/i18n/navigation'
import { getLocale } from '@/i18n/utils'
import { getRouteIcons, getRoutes } from '@/lib/get-routes'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale: getLocale(locale), namespace: 'site' })
  const tRoutes = await getTranslations({ locale: getLocale(locale), namespace: 'routes' })
  const landingTitles = t.raw('landingTitles') as string[]
  const routes = getRoutes(tRoutes)
  const routeIcons = getRouteIcons()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <GravityStarsBackground
        starsCount={siteConfig.starsCount}
        className="absolute inset-0 flex items-center justify-center rounded-xl"
      />
      <MorphingText texts={landingTitles} className="pointer-none select-none" />
      <div className="flex items-center justify-center gap-6">
        <TooltipProvider>
          {routes.map((item, index) => {
            const Icon = routeIcons[item.id]

            return (
              <React.Fragment key={item.id}>
                <Tooltip>
                  <TooltipTrigger className="z-10">
                    <Link
                      href={item.path}
                      aria-label={item.name}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'icon-2xl' }), 'rounded-full')}
                    >
                      {Icon !== undefined ? <Icon className="size-12" /> : item.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
                {index < routes.length - 1 && <Separator orientation="vertical" className="h-8" />}
              </React.Fragment>
            )
          })}
        </TooltipProvider>
      </div>
    </div>
  )
}
