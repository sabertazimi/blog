'use client'

import { useTranslations } from 'next-intl'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { buttonVariants } from '@/components/ui/button'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@/i18n/navigation'
import { getRouteIcons, getRoutes } from '@/lib/get-routes'
import { cn } from '@/lib/utils'

function LandingNav() {
  const t = useTranslations('routes')
  const routes = getRoutes(t)
  const routeIcons = getRouteIcons()

  return (
    <TooltipProvider>
      <Dock direction="middle">
        {routes.map((item) => {
          const Icon = routeIcons[item.id]

          return (
            <DockIcon key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    aria-label={item.name}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'icon-xl' }), 'rounded-full')}
                  >
                    {Icon !== undefined ? <Icon className="size-6" /> : item.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          )
        })}
        <Separator orientation="vertical" className="h-full" />
        <DockIcon>
          <AnimatedThemeToggler size="icon-xl" className="rounded-full" iconClassName="size-6" />
        </DockIcon>
      </Dock>
    </TooltipProvider>
  )
}

export default LandingNav
