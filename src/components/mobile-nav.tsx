'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex flex-1 items-center justify-between md:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative flex size-5 items-center justify-center">
              <div className="relative size-5">
                <span
                  className={cn(
                    'bg-foreground absolute top-[0.56rem] left-0 block h-0.5 w-5 transition-all duration-200 ease-in-out',
                    isOpen ? '-rotate-45' : '-translate-y-1.5',
                  )}
                />
                <span
                  className={cn(
                    'bg-foreground absolute top-[0.56rem] left-0 block h-0.5 w-5 transition-all duration-200 ease-in-out',
                    isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                  )}
                />
                <span
                  className={cn(
                    'bg-foreground absolute top-[0.56rem] left-0 block h-0.5 w-5 transition-all duration-200 ease-in-out',
                    isOpen ? 'rotate-45' : 'translate-y-1.5',
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={14}
        >
          <nav className="flex flex-col gap-3 px-6 py-6">
            {routes.map(route => (
              <Link
                key={route.id}
                href={route.path}
                className={cn(
                  'hover:text-accent-foreground flex items-center text-2xl font-medium transition-colors px-2',
                  pathname === route.path && 'text-accent-foreground bg-accent',
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default MobileNav
