'use client'

import { useTranslations } from 'next-intl'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { buttonVariants } from '@/components/ui/button'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@/i18n/navigation'
import { getRoutes } from '@/lib/get-routes'
import { cn } from '@/lib/utils'

function LandingNav() {
  const t = useTranslations('routes')
  const routes = getRoutes(t)

  return (
    <TooltipProvider>
      <Dock direction="middle">
        {routes.map(route => (
          <DockIcon key={route.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={route.path}
                  aria-label={route.name}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'icon-xl' }), 'rounded-full')}
                >
                  {route.icon !== undefined ? <route.icon className="size-6" /> : route.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{route.title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        <DockIcon>
          <AnimatedThemeToggler size="icon-xl" className="rounded-full" iconClassName="size-6" />
        </DockIcon>
      </Dock>
    </TooltipProvider>
  )
}

export default LandingNav
