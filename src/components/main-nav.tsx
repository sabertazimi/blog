'use client'

import { useTranslations } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link, usePathname } from '@/i18n/navigation'
import { getRoutes } from '@/lib/get-routes'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()
  const t = useTranslations('routes')
  const routes = getRoutes(t)

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList>
        {routes.map(route => (
          <NavigationMenuItem key={route.id}>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                'font-extrabold',
                pathname === route.path && 'bg-accent text-accent-foreground',
              )}
            >
              <Link href={route.path} title={route.title}>
                {route.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
