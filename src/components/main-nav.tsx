'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

function MainNav() {
  const pathname = usePathname()

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

export default MainNav
