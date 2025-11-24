import { HomeIcon, InfoIcon } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { GravityStarsBackground } from '@/components/ui/gravity-stars'
import { MorphingText } from '@/components/ui/morphing-text'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const routeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  posts: HomeIcon,
  about: InfoIcon,
}

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <GravityStarsBackground
        starsCount={siteConfig.landingPage.starsCount}
        className="absolute inset-0 flex items-center justify-center rounded-xl"
      />
      <MorphingText texts={siteConfig.landingPage.titles} className="pointer-none select-none" />
      <div className="flex items-center justify-center gap-6">
        <TooltipProvider>
          {routes.map((item, index) => {
            const Icon = routeIcons[item.id]
            return (
              <React.Fragment key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.path}
                      aria-label={item.name}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'z-10 size-12 rounded-full')}
                    >
                      <Icon className="size-8" />
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
