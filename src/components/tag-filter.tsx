'use client'

import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  selectedTag: string
  tagCounts?: Record<string, number>
}

function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams()
    if (tag !== 'All') {
      params.set('tag', tag)
    }
    router.push(`${pathname}?${params.toString()}`)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <div className="hidden flex-wrap gap-2 md:flex">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              'flex h-8 cursor-pointer items-center rounded-lg border px-1 pl-3 text-sm transition-colors',
              selectedTag === tag
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:bg-muted',
            )}
            type="button"
          >
            <span>{tag}</span>
            {tagCounts?.[tag] !== undefined && tagCounts?.[tag] !== 0 && (
              <span
                className={cn(
                  'ml-2 flex h-6 min-w-6 items-center justify-center rounded-md border text-xs font-medium',
                  selectedTag === tag
                    ? 'border-border/40 dark:border-primary-foreground bg-background text-primary'
                    : 'border-border dark:border-border',
                )}
              >
                {tagCounts[tag]}
              </span>
            )}
          </button>
        ))}
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger className="border-border hover:bg-muted flex w-full items-center justify-between rounded-lg border px-4 py-2 transition-colors md:hidden">
          <span className="text-sm font-medium capitalize">{selectedTag}</span>
          <ChevronDown className="h-4 w-4" />
        </DrawerTrigger>
        <DrawerContent className="md:hidden">
          <DrawerHeader>
            <h3 className="text-sm font-semibold">Select Category</h3>
          </DrawerHeader>
          <div className="space-y-2 px-4">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="flex w-full cursor-pointer items-center justify-between text-sm font-medium transition-colors"
                type="button"
              >
                <span
                  className={cn(
                    selectedTag === tag ? 'text-primary underline underline-offset-4' : 'text-muted-foreground',
                  )}
                >
                  {tag}
                </span>
                {tagCounts?.[tag] !== undefined && tagCounts?.[tag] !== 0 && (
                  <span className="border-border ml-2 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md border">
                    {tagCounts[tag]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TagFilter
